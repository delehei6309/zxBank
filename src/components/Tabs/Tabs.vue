<template>
    <div class="footer-tabs" flex-box="0" flex="box:mean">
        <router-link class="tabs-item tab-index" :to="{path:'/home'}"
                     active-class="tab-active"
                     replace flex-box="1">首页
        </router-link>
        <router-link class="tabs-item tab-financial" :to="{path:'/financial'}"
                     active-class="tab-active"
                     replace flex-box="1">理财
        </router-link>
        <router-link class="tabs-item tab-relation" :to="{path:'/life'}"
                     active-class="tab-active"
                     replace flex-box="1">生活
        </router-link>
        <router-link class="tabs-item tab-mine" :to="{path:'/my'}"
                     active-class="tab-active"
                     replace flex-box="1">我的
        </router-link>
    </div>
</template>

<script>
    export default {
        name: "tabs"
    }
</script>

<style scoped>
    .footer-tabs {
        position: relative;
        height: 50px;
        background: #4E4E4E;
        box-shadow: inset 0 2px 1px 0 rgba(0, 0, 0, .2);
        text-align: center;
        padding: 4px 0;
        .tabs-item {
            color: #ccc;
            font-size: .6rem;
            padding-top: 24px;
            background-size: 22px 24px;
            background-repeat: no-repeat;
            background-position: center top;
            &.tab-active {
                color: #FFD77E;
                &.tab-index {
                    background-image: url("../../images/wm/wm-index-active.png");
                }
                &.tab-financial {
                    background-image: url("../../images/wm/wm-financial-active.png");
                }
                &.tab-relation {
                    background-image: url("../../images/wm/wm-relation-active.png");
                }
                &.tab-mine {
                    background-image: url("../../images/wm/wm-mine-active.png");
                }
            }
            &.tab-index {
                background-image: url("../../images/wm/wm-index.png");
            }
            &.tab-financial {
                background-image: url("../../images/wm/wm-financial.png");
            }
            &.tab-relation {
                background-image: url("../../images/wm/wm-relation.png");
            }
            &.tab-mine {
                background-image: url("../../images/wm/wm-mine.png");
            }
        }
    }
</style>
