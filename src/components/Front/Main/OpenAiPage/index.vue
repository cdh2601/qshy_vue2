<template>
    <div>
        <div class="openAiPageTitle">
            <div class="bubble">
                在这里，您可以提出任何您想问的......
            </div>
        </div>
        <div class="chat-container">
            <div class="chat">
                <div class="chat-input">
                    <input v-model="prompt" @keyup.enter="generateResponse" placeholder="请输入您的问题" class="input-field" />
                    <button @click="generateResponse" class="send-button">发送</button>
                </div>
                <div class="chat-messages">
                    <div v-for="(message, index) in messages" :key="index" class="message-container"
                        :class="{ 'user-message-container': message.role === 'user', 'bot-message-container': message.role === 'bot' }">
                        <div v-if="message.role === 'user'" class="user-message">
                            {{ message.content }}
                        </div>
                        <div v-else class="bot-message">
                            {{ message.content }}
                            <!-- 如果locations有值，则在每个回答下方添加小提示 -->
                            <div v-if="locations.length > 0 && index === 1" class="createRoute">
                                可能想构造的路线：<span @click="createRoute">{{ locations[0] }}-{{ locations[1] }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AxiosOpenAi from "@/utils/requestOpenAi";
// import { NlpManager } from 'node-nlp';

export default {
    name: "OpenAiPage",
    data() {
        return {
            prompt: "",
            messages: [],
            locations: [],
        };
    },
    methods: {
        createRoute() {
            const userInfo = sessionStorage.getItem("userInfo");
            if (!userInfo) {
                this.$message.warning("请先登录后创建路线");
            }
            else {
                this.$router.push({
                    path: '/makeRoute',
                    query: {
                        start: this.locations[0],
                        end: this.locations[1],
                    },
                })
            }
        },
        generateResponse() {
            if (!this.prompt.trim()) return;
            this.messages.push({ content: this.prompt, role: "user" }); // 添加用户问题
            let params = {
                prompt: this.prompt,
            };
            AxiosOpenAi.get("book/api/books", { params }).then((res) => {
                const message = res.data.content;
                this.locations = res.data.locations;
                this.messages.push({ content: message, role: "bot" });
                // 清空输入框
                this.prompt = "";
            });
        },
    },
};
</script>

<style scoped>
.openAiPageTitle {
    font-size: 15px;
    margin: 20px 0 20px;
}

.bubble {
    position: relative;
    /* 设置相对定位 */
    background-color: rgb(184, 28, 34);
    /* 气泡背景颜色 */
    color: white;
    /* 文本颜色 */
    padding: 10px 20px;
    /* 上下左右内边距 */
    border-radius: 20px;
    /* 圆角边框 */
    display: inline-block;
    /* 内容以块级元素显示 */
}

.bubble::after {
    content: '';
    /* 添加内容 */
    position: absolute;
    /* 设置绝对定位 */
    bottom: -18px;
    /* 距离底部的偏移量 */
    left: 75%;
    /* 距离左侧的偏移量 */
    transform: translateX(-50%);
    /* 将三角形水平居中 */
    border-width: 10px;
    /* 三角形大小 */
    border-style: solid;
    border-color: rgb(184, 28, 34) transparent transparent transparent;
    /* 透明边框颜色，逆时针分别为上、右、下、左 */
}

.chat-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}

.chat {
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
}

.prompt {
    background-color: #f0f0f0;
    padding: 10px;
    border-bottom: 1px solid #ccc;
    position: sticky;
    top: 0;
    z-index: 1;
}

.chat-messages {
    padding: 10px;
    flex-grow: 1;
    overflow-y: auto;
}

.message-container {
    display: flex;
    justify-content: flex-end;
    margin: 10px;
}

.user-message {
    background-color: rgb(184, 28, 34);
    color: white;
    padding: 8px 12px;
    border-radius: 5px;
    margin-left: 10px;
}

.bot-message {
    background-color: #eee;
    padding: 8px 12px;
    border-radius: 5px;
    margin-right: 10px;
}

.chat-input {
    display: flex;
    padding: 10px;
}

.input-field {
    flex: 1;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.send-button {
    margin-left: 10px;
    padding: 8px 20px;
    border: none;
    border-radius: 5px;
    background-color: rgb(184, 28, 34);
    color: white;
    cursor: pointer;
}

.user-message-container {
    display: flex;
    justify-content: flex-end;
}

.bot-message-container {
    display: flex;
    justify-content: flex-start;
}

.createRoute {
    span {
        cursor: pointer;
        color: rgb(184 28 34);
    }
}
</style>
