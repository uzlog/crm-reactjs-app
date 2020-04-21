import {CheckCircleOutlined, CloseCircleOutlined} from "@ant-design/icons";
import React from "react";

export const columns = [
  {
    title: 'Name',
    dataIndex: 'name'
  },
  {
    title: 'Phone Number',
    dataIndex: 'phone'
  },
  {
    title: 'Email',
    dataIndex: 'email'
  },
  {
    title: 'Active',
    key: 'active',
    dataIndex: 'active',
    render: (active) => (
      active ? <CheckCircleOutlined style={{color: '#4CAF50'}} /> : <CloseCircleOutlined style={{color: '#f44336'}}/>
    )
  }
];
