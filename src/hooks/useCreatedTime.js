import React from "react";

export function useCreatedTime() {
  const now = new Date();
  const nowYear = now.getFullYear();
  const nowMonth = ("0" + (now.getMonth() + 1)).slice(-2);
  const nowDate = ("0" + now.getDate()).slice(-2);
  const nowHour = ("0" + now.getHours()).slice(-2);
  const nowMinute = ("0" + now.getMinutes()).slice(-2);
  const nowSecond = ("0" + now.getSeconds()).slice(-2);

  const createdTime =
    nowYear + nowMonth + nowDate + "_" + nowHour + nowMinute + nowSecond;
  console.log("createdTime : ", createdTime);

  return { createdTime };
}
