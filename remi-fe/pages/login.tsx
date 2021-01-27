import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { store } from 'react-notifications-component';
import { useLogin, useUser } from '~/store/user/hook';
import { home } from '~/url';

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
    const router = useRouter();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isPending, setPending] = useState<boolean>(false);
    const user = useUser();
    const login = useLogin();

    useEffect(() => {
        setPending(false);
        if (user?.isLogin) {
            router.push(home());
        }
    }, [user]);

    const validate = () => {
        if (!password || !email) {
            store.addNotification({
                title: 'Login',
                message: 'Please Input Email or Password',
                type: 'danger',
                insert: 'top',
                container: 'top-right',
                animationIn: ['animate__animated', 'animate__fadeIn'],
                animationOut: ['animate__animated', 'animate__fadeOut'],
                dismiss: {
                  duration: 1500,
                  onScreen: true,
                },
              });
              return true;
        }
        return false;
    };

    const submit = () => {
        setPending(true);
        if (validate()) {
            setPending(false);
            return;
        }
        login({
            password,
            email,
        });
    };

    const onPassword = (e: any) => {
        const { target: { value } } = e;
        setPassword(value);
    };

    const onEmail = (e: any) => {
        const { target: { value } } = e;
        setEmail(value);
    };

    return (
        <Wrapper>
            <section className="form__share">
                <div className="form__label font-weight-bold h4 pl-3 pr-3">Register</div>
                <div className="form-group row">
                    <label htmlFor="Email" className="col-sm-2 col-form-label text-left">Email</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="email" placeholder="Email" value={email} onInput={onEmail} disabled={isPending} />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="url" className="col-sm-2 col-form-label text-left">Password</label>
                    <div className="col-sm-10">
                        <input type="password" className="form-control" id="password" placeholder="Password" value={password} onInput={onPassword} disabled={isPending} />
                    </div>
                </div>
                <button type="button" className="btn btn-primary btn-block mt-5" onClick={submit} disabled={isPending}>Login</button>
            </section>
        </Wrapper>
    );
};
