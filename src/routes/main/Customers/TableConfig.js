import {CheckCircleOutlined, CloseCircleOutlined} from "@ant-design/icons";
import React from "react";
import IntlMessages from "../../../util/IntlMessages";

export const columns = [
  {
    title: (<IntlMessages id="customer.name" />) ,
    dataIndex: 'name'
  },
  {
    title: (<IntlMessages id="customer.phone" />),
    dataIndex: 'phone'
  },
  {
    title: (<IntlMessages id="customer.email" />),
    dataIndex: 'email'
  },
  {
    title: (<IntlMessages id="customer.birthday" />),
    dataIndex: 'birthday'
  },
  {
    title: (<IntlMessages id="customer.active" />),
    key: 'active',
    dataIndex: 'active',
    render: (active) => (
      active ? <CheckCircleOutlined style={{color: '#4CAF50'}} /> : <CloseCircleOutlined style={{color: '#f44336'}}/>
    )
  }
];
