import React, { useState, useEffect } from 'react';
import { getApi } from '../../api/api';

import "./Api.css";

function Api() {
    const [data, setData] = useState([]);

    useEffect(() => {
        getApi().then(res => {
            setData(res);
        })
    }, []);

    return (
        <div className="api-list">
            <h2>List of APIs</h2>
            {data.map((item, indexA) => {
                return (
                    <div className="api-list__item" key={`api-item-${indexA}`}>
                        <h3>{item.name}</h3>
                        {item.items.map((details, indexB) => {
                            return (
                                <div className="api-list__item__section" key={`details-${indexA}-${indexB}`}>
                                    {details.path && (
                                        <div className="api-list__item__row">
                                            <div>Path</div>
                                            <div>{details.path}</div>
                                        </div>
                                    )}

                                    {details.description && (
                                        <div className="api-list__item__row">
                                            <div>Description</div>
                                            <div>{details.description}</div>
                                        </div>
                                    )}

                                    {details.method && (
                                        <div className="api-list__item__row">
                                            <div>Method</div>
                                            <div>{details.method}</div>
                                        </div>
                                    )}

                                    {details.body && (
                                        <div className="api-list__item__row">
                                            <div>Body</div>
                                            <div>{JSON.stringify(details.body)}</div>
                                        </div>
                                    )}

                                    <div className="api-list__item__row">
                                        <div>Status</div>
                                        <div>
                                            <ul>
                                                {details.status.map((s, statusIndex) => {
                                                    return (
                                                        <li key={`status-${indexA}-${indexB}-${statusIndex}`}>
                                                            <p>Code: {s.code}</p>
                                                            <p>Message: {s.message}</p>
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )
}

export default Api;