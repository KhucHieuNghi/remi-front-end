import React from 'react';
import styled from '@emotion/styled';

const Wrapper = styled.section`
    margin-top: 20vh;
    .form__share{
        border: 1px solid rgba(0,0,0,.1);
        padding: 30px;
        border-radius: 5px;
        position: relative;
    }

    .form__label{
        background: white;
        position: absolute;
        z-index: 5;
        left: 10px;
        top: -20px;
    }
`;

export default () => {
    console.log();

    return (
        <Wrapper>
            <section className="form__share">
                <div className="col-sm-2 col-form-label form__label font-weight-bold h3">Share a Youtube movie</div>
                <div className="form-group row">
                    <label htmlFor="Title" className="col-sm-2 col-form-label text-left">Title</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="title" placeholder="Title" />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="url" className="col-sm-2 col-form-label text-left">Youtube URL</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="url" placeholder="Youtube URL" />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="description" className="col-sm-2 col-form-label text-left">Description</label>
                    <div className="col-sm-10">
                        <textarea className="form-control" id="description" rows={3} placeholder="Description" />
                    </div>
                </div>
                <button type="button" className="btn btn-primary btn-block mt-5">Share</button>
            </section>
        </Wrapper>
    );
};
