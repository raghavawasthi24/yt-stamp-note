"use client";
import React from "react";

export default function page() {
  function click() {
    console.log("click");
  }
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>Savings</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td onClick={click}></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
