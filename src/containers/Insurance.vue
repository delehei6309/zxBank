<template>
    <div class="insurance">
        <div class="thems" flex="box:mean">
            <div class="them">
                <img src="../images/insurance/yiwai.png"/>
                <p>意外</p>
            </div>
            <div class="them">
                <img src="../images/insurance/luxing.png"/>
                <p>旅行</p>
            </div>
            <div class="them">
                <img src="../images/insurance/caichan.png"/>
                <p>财产</p>
            </div>
            <div class="them">
                <img src="../images/insurance/jiankang.png"/>
                <p>健康</p>
            </div>

        </div>
        <div class="recommend">
            <div class="title">保险主题</div>
            <div class="items" flex="box:mean">
                <div class="item bysy" flex="cross:center  main:center">
                    <p class="item-text">病有所依</p>

                </div>
                <div class="item cfxb" flex="cross:center main:center">
                    <p class="item-text">财富相伴</p>

                </div>
                <div class="item cxbz" flex="cross:center  main:center">
                    <p class="item-text">出行保障</p>

                </div>

            </div>
        </div>
        <div class="hot-topic">
            <div class="title">热销TOP3</div>
            <div class="list">
                <div class="list-item" flex>
                    <div class="cicle" flex-box="0" flex="cross:center main:center">荐</div>
                    <div class="explain" flex-box="1">
                        <h5 class="main-text">女性尊享百万意外</h5>
                        <p class="sub-text">
                            女性专属百万级保障，工作日常
                            意外全覆盖</p>
                    </div>
                    <div class="action-warp" flex-box="0" flex="cross:center">
                        <button class="action">199元起</button>
                    </div>
                </div>
                <div class="list-item" flex>
                    <div class="cicle xin" flex-box="0" flex="cross:center main:center">新</div>
                    <div class="explain" flex-box="1">
                        <h5 class="main-text">女性尊享百万意外</h5>
                        <p class="sub-text">女性专属百万级保障，工作日常
                            意外全覆盖</p>
                    </div>
                    <div class="action-warp" flex-box="0" flex="cross:center">
                        <button class="action">300元起</button>
                    </div>
                </div>
                <div class="list-item" flex>
                    <div class="cicle li" flex-box="0" flex="cross:center main:center">礼</div>
                    <div class="explain" flex-box="1">
                        <h5 class="main-text">女性尊享百万意外</h5>
                        <p class="sub-text">女性专属百万级保障，工作日常
                            意外全覆盖</p>
                    </div>
                    <div class="action-warp" flex-box="0" flex="cross:center">
                        <button class="action">1000元起</button>
                    </div>

                </div>
            </div>
        </div>
        <div class="recommend">
            <div class="title">咨询推荐</div>
            <div class="rcmd-item" flex>
                <div class="left" flex-box="1">买保险的五大步骤，手把手教你</div>
                <div class="right" flex-box="0" flex="main:right">2天前</div>
            </div>
            <div class="rcmd-item" flex>
                <div class="left" flex-box="1">买保险的五大步骤，手把手教你</div>
                <div class="right" flex-box="0" flex="main:right">2天前</div>
            </div>
        </div>
    </div>

</template>

<script>

    export default {
        name: 'insurance',
        data() {
            return {}
        },
        created() {
        },
        computed: {},
        methods: {},
        mounted() {
        },
        destroyed() {

        }
    }
</script>

<style scoped>
    .insurance {
        position: relative;
        overflow-y: auto;
        .thems {
            background: #fff;
            padding: .8rem 0;
            .them {
                text-align: center;
                p {
                    color: #333;
                    font-size: .6rem;
                }
                img {
                    width: 1.2rem;
                }
            }
        }
        .recommend, .hot-topic {
            margin-top: .5rem;
            padding: .8rem;
            background: #fff;
            .title {
                font-size: .7rem;
                font-weight: 500;
                color: #333;
                font-weight: bold;
                line-height: 1.4rem;
            }
            .items {
                .item {
                    position: relative;
                    margin: .5rem .5rem 0;
                    background-color: rgba(0, 0, 0, .3);
                    background-image: url(../images/insurance/item2.png);
                    height: 3.4rem;
                    border-radius: .5rem;
                    .item-text {

                        font-size: .9rem;
                        color: #fff;
                    }
                    &:first-child {
                        background-image: url(../images/insurance/item1.png);
                        margin-left: 0;
                        margin-right: 0;
                    }
                    &:last-child {
                        background-image: url(../images/insurance/item3.png);
                        margin-left: 0;
                        margin-right: 0;
                    }
                }
            }
            .list {
                .list-item {
                    line-height: 1rem;
                    padding: .7rem .5rem;
                    border-bottom: 1px solid #ddd;
                    &:last-child {
                        border-bottom: none;
                        padding-bottom: 0;
                    }
                    .cicle {
                        width: 3rem;
                        color: #fff;
                        font-weight: bold;
                        font-family: hzgb;
                        background-image: url(../images/insurance/topic.png);
                    }
                    .explain {
                        margin-left: 1rem;
                        margin-right: 1rem;
                        .main-text {
                            line-height: 1.2rem;
                            color: #333;
                        }
                        .sub-text {
                            line-height: .8rem;
                            font-size: .6rem;
                            color: #666;
                        }
                    }
                    .action-warp {
                        width: 3.6rem;
                    }
                    .action {
                        width: 3.6rem;
                        padding: 0;
                        color: #fff;
                        height: 1.5rem;
                        cursor: pointer;
                        background-image: linear-gradient(-180deg, #DC000C 0%, #B60005 100%);
                        border-radius: 100px;
                    }
                }
            }
            .rcmd-item {
                line-height: 1.4rem;
                .left {
                    font-size: .7rem;
                    color: #666;
                }
                .right {
                    width: 3.5rem;
                    font-size: .6rem;
                    color: #999;
                }
            }
        }
    }
</style>
