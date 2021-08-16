// database
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/database";

import { useState, useEffect } from "react";
import { Button, Input, notification, Row, Col } from "antd";

// 資料庫資訊
const firebaseConfig = {
  apiKey: "AIzaSyAuEKVbi5bNM-V2my8GifCpvYqnEoA5uBI",
  authDomain: "just-4-fun-e234d.firebaseapp.com",
  projectId: "just-4-fun-e234d",
  storageBucket: "just-4-fun-e234d.appspot.com",
  messagingSenderId: "89823063333",
  appId: "1:89823063333:web:b0ad61086998c0d66c3ecc",
  measurementId: "G-GWLHXDENRN",
};

// 配置資料庫
if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
else firebase.app();

export default function MyAccount(props) {
  function signUp(address, password) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(address, password)
      .then(function (user) {
        notification.open({
          message: "註冊成功",
          description: "Automatically sign in.",
        });
      })
      .catch(function (error) {
        notification.open({
          message: "註冊失敗",
          description: error.message,
        });
      });
  }

  function signIn(address, password) {
    firebase
      .auth()
      .signInWithEmailAndPassword(address, password)
      .catch((error) => {
        notification.open({
          message: "登入失敗",
          description: error.message,
        });
      });
  }

  function signOut(address, password) {
    firebase.auth().signOut();
  }

  function load(setTags, setData, setTagsStandard) {
    let user = firebase.auth().currentUser;
    firebase
      .database()
      .ref(`users/${user.uid}`)
      .once("value", (snapshot) => {
        let data = snapshot.val();
        if (data.tagsStandard !== undefined) setTagsStandard(data.tagsStandard);
        if (data.data !== undefined)
          setData(
            data.data.map((item) => {
              let ret = item;
              if (ret.tags === undefined) ret.tags = [];
              return ret;
            })
          );
        if (data.tags !== undefined) setTags(data.tags);
      });
  }

  function save(tags, data, tagsStandard) {
    let user = firebase.auth().currentUser;
    firebase.database().ref(`users/${user.uid}`).set({
      tags: tags,
      data: data,
      tagsStandard: tagsStandard,
    });
  }

  const [auth, setAuth] = useState(null);
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setAuth(user);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  let refAddress = "";
  let refPassword = "";

  if (auth === null)
    return (
      <>
        <Row gutter={[8, 8]} align="middle">
          <Col span={8} style={{ textAlign: "right" }}>
            信箱：
          </Col>
          <Col span={16}>
            <Input
              type="text"
              onChange={(e) => (refAddress = e.target.value)}
            />
          </Col>
          <Col span={8} style={{ textAlign: "right" }}>
            密碼：
          </Col>
          <Col span={16}>
            <Input
              type="text"
              onChange={(e) => (refPassword = e.target.value)}
            />
          </Col>
          <Col offset={8} span={8}>
            <Button
              type="primary"
              block
              onClick={() => signIn(refAddress, refPassword)}
            >
              登入
            </Button>
          </Col>
          <Col span={8}>
            <Button
              type="primary"
              block
              onClick={() => signUp(refAddress, refPassword)}
            >
              註冊
            </Button>
          </Col>
        </Row>
      </>
    );
  else
    return (
      <>
        <Button
          type="primary"
          block
          onClick={() =>
            load(props.setTags, props.setData, props.setTagsStandard)
          }
        >
          載入存檔
        </Button>
        <Button
          type="primary"
          block
          onClick={() => {
            save(props.tags, props.data, props.tagsStandard);
          }}
          style={{ marginTop: "8px" }}
        >
          存檔
        </Button>
        <Button
          type="primary"
          block
          onClick={signOut}
          style={{ marginTop: "8px" }}
        >
          登出
        </Button>
      </>
    );
}
