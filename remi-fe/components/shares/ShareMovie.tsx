/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import styled from '@emotion/styled';
import Youtube from '~/components/shares/Youtube';
import {
 LikeSvg, DisLikeSvg, VoteSvg, DisVoteSvg,
} from '~/svg';

const Wrapper = styled.section`    
    @media (max-width: 992px) {
        flex-wrap: wrap !important;
      }

    .movie__yout{
        width: 100%;
        height: auto;
        
        .yout-container{
            display: inline-block;
            width: 100%;
            height: 100%;
        }
    }

    .info{
        &__name{
            color: #cb3837;
        }
    }
    
    .vote__container{

    }

    .vote{
        right: 0;
        &__track{
            cursor: pointer;
        }

        .voted{
            fill: rgb(13, 92, 182);
        }

        svg{
            width: 100%;
            max-width: 50px;
            height: 100%;
        }
    }
`;

interface I_VOTE {
    [key: number]: string
}

const TYPE_VOTE:I_VOTE = {
    0: 'un-voted',
    1: 'voted up',
    2: 'voted down',
};

export default () => {
    const [voted, setVoted] = useState<number>(0);
    return (
        <Wrapper className="movie text-center d-flex p-4">
            <section className="movie__yout p-2">
                <Youtube />
            </section>
            <section className="movie__info info p-3 ml-3 text-left">
                <div className="info__name font-weight-bold p-2 h3">
                    Movie Title
                </div>
                <div className="info__by-share p-2">
                    <span>
                        Shared by <span className="font-weight-bold">as@gma.ocm</span>
                    </span>
                </div>
                <div className="info__emotion p-2">
                    <span><LikeSvg /> 89</span>
                    <span className="ml-4"><DisLikeSvg /> 89</span>
                </div>
                <div className="info__description description p-2">
                    <section className="description__label p-2">
                        Description:
                    </section>
                    <section className="description__content p-2">
                        Remiatno Remiatno Remiatno Remiatno Remiatno Remiatno Remiatno Remiatno
                        Remiatno Remiatno Remiatno Remiatno Remiatno Remiatno Remiatno Remiatno
                    </section>
                </div>
                <div className="text-center p-2">
                    <span className="vote">
                        <div className={`vote__track mr-3 d-inline-block ${voted === 1 ? 'voted' : ''}`} onClick={() => setVoted(1)}>
                            <VoteSvg />
                        </div>
                        <div className={`vote__track ml-3 d-inline-block ${voted === 2 ? 'voted' : ''}`} onClick={() => setVoted(2)}>
                            <DisVoteSvg />
                        </div>
                        <span className="font-weight-bold ml-4">
                            {`(${TYPE_VOTE[voted]})`}
                        </span>
                    </span>
                </div>
            </section>
        </Wrapper>
    );
};
