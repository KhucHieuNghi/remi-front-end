import React from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { LogoSvg } from '~/svg';
import { myMovies, share } from '~/url';
// interface Props {
//     children: ReactChildren
// }

const Header = styled.header`
    .header__container{
        border-bottom: 1px solid rgba(0,0,0,.1);
        margin-top: 0px !important;
        display: flex;
        justify-content: space-between;
        align-items: center;
        svg{
            max-width: 80px;
            height: auto;
        }

        .title{
            display: flex;
            align-items: center;
            
            &--name{
                color: rgb(13, 92, 182);
            }
        }

        .user-info{
            align-items: center;
            display: flex;
        }
    }
`;

export default () => {
    console.log();
    const router = useRouter();

    const LoginInfo = () => (
        <React.Fragment>
            <input className="form-control mr-sm-2" type="email" placeholder="Email" />
            <input className="form-control mr-sm-2" type="password" placeholder="Password" />
            <button className="btn btn-outline-primary my-2 my-sm-0" type="button">Login/Register</button>
        </React.Fragment>
        );

    const UserInfo = () => (
        <React.Fragment>
            <span className="mr-3">Welcome someone@gmail</span>
            <button className="btn btn-outline-success my-2 my-sm-0 mr-3" type="button" onClick={() => router.push(myMovies())}>Share a movie</button>
            <button className="btn btn-outline-success my-2 my-sm-0 mr-3" type="button" onClick={() => router.push(share())}>My movies</button>
            <button className="btn btn-danger my-2 my-sm-0" type="button">Logout</button>
        </React.Fragment>
    );

    return (
        <Header className="header">
            <section className="header__container m-5">
                <div className="title">
                    <LogoSvg />
                    <span className="title--name font-weight-bold h1 p-4">Funny Movies</span>
                </div>
                <div className="user-info">
                    {/* <LoginInfo /> */}
                    <UserInfo />
                </div>
            </section>
        </Header>
    );
};
