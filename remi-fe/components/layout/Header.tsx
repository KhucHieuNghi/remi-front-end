import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
 Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
} from 'reactstrap';
import ReactNotification, { store } from 'react-notifications-component';
import { useLogout, useUser, useLogin } from '~/store/user/hook';
import { LogoSvg } from '~/svg';
import {
 myMovies, share, register,
} from '~/url';
// interface Props {
//     children: ReactChildren
// }

export default () => {
    const router = useRouter();
    const user = useUser();
    const logout = useLogout();
    const login = useLogin();

    const emailRef = useRef<any>(null);
    const passwordRef = useRef<any>(null);

    const [isPending, setPending] = useState<boolean>(false);
    const [show, setShow] = useState<boolean>(false);

    useEffect(() => {
        setPending(false);

        // const User = mongoose.model('User', { name: String, roles: Array, age: Number });

        // const user1 = new User({ name: 'modulus admin', age: 42, roles: ['admin', 'moderator', 'user'] });

        // // Some modifications in user object
        // user1.name = user1.name.toUpperCase();

        // // Lets try to print and see it. You will see _id is assigned.
        // console.log(user1);

        // // Lets save it
        // user1.save((err, userObj) => {
        // if (err) {
        //     console.log(err);
        // } else {
        //     console.log('saved successfully:', userObj);
        // }
        // });
    }, [user]);

    const validate = () => {
        if (!passwordRef?.current?.value || !emailRef?.current?.value) {
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
            password: passwordRef?.current?.value,
            email: emailRef?.current?.value,
        });
    };

    const LoginInfoPC = () => (
        <React.Fragment>
            <input className="form-control mr-sm-2" type="email" placeholder="Email" disabled={isPending} ref={emailRef} />
            <input className="form-control mr-sm-2" type="password" placeholder="Password" disabled={isPending} ref={passwordRef} />
            <button className="btn btn-outline-success my-2 my-sm-0 mr-3" type="button" onClick={submit}>Login</button>
            <button className="btn btn-outline-primary my-2 my-sm-0" type="button" onClick={() => router.push(register())}>Register</button>
        </React.Fragment>
        );

    const UserInfoPC = () => (
        <React.Fragment>
            <span className="mr-3">{`Welcome ${user.email}`}</span>
            <button className="btn btn-outline-success my-2 my-sm-0 mr-3" type="button" onClick={() => router.push(myMovies())}>Share a movie</button>
            <button className="btn btn-outline-success my-2 my-sm-0 mr-3" type="button" onClick={() => router.push(share())}>My movies</button>
            <button className="btn btn-danger my-2 my-sm-0" type="button" onClick={logout}>Logout</button>
        </React.Fragment>
    );

    const LoginInfoMobile = () => (
        <DropdownMenu right>
            <DropdownItem header>Header</DropdownItem>
            <DropdownItem text><input className="form-control mr-sm-2" type="email" placeholder="Email" disabled={isPending} ref={emailRef} /></DropdownItem>
            <DropdownItem text><input className="form-control mr-sm-2" type="password" placeholder="Password" disabled={isPending} ref={passwordRef} /></DropdownItem>
            <DropdownItem divider />
            <DropdownItem text><button className="btn btn-outline-success btn-block" type="button" onClick={submit}>Login</button></DropdownItem>
            <DropdownItem text><button className="btn btn-outline-primary btn-block" type="button" onClick={() => router.push(register())}>Register</button></DropdownItem>
        </DropdownMenu>
        );

    const UserInfoMobile = () => (
        <DropdownMenu right>
            <DropdownItem header>Welcome</DropdownItem>
            <DropdownItem text>{user.email}</DropdownItem>
            <DropdownItem divider />
            <DropdownItem text><button className="btn btn-outline-success btn-block" type="button" onClick={() => router.push(myMovies())}>Share a movie</button></DropdownItem>
            <DropdownItem text><button className="btn btn-outline-success btn-block" type="button" onClick={() => router.push(share())}>My movies</button></DropdownItem>
            <DropdownItem text><button className="btn btn-danger btn-block" type="button" onClick={logout}>Logout</button></DropdownItem>
        </DropdownMenu>
    );

    return (
        <header className="header">
            <ReactNotification />
            <section className="header__container m-5">
                <div className="title">
                    <LogoSvg />
                    <span className="title--name font-weight-bold h1 p-4">Funny Movies</span>
                </div>
                <div className="user-info header-mobile">
                    <Dropdown isOpen={show} toggle={() => setShow(!show)} color="primary">
                        <DropdownToggle caret>
                            Menu
                        </DropdownToggle>
                        {user.isLogin ? <UserInfoMobile /> : <LoginInfoMobile />}
                    </Dropdown>
                </div>
                <div className="user-info header-pc">
                    {user.isLogin ? <UserInfoPC /> : <LoginInfoPC />}
                </div>
            </section>
        </header>
    );
};
