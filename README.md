# Chat with GPT

开源自托管 ChatGPT 客户端，支持语音输入输出。

## 功能特性

- ChatGPT 对话界面
- 语音输入/输出
- 对话历史管理
- 多模型支持
- 中文界面

## 快速部署

```bash
docker run -d -p 3000:3000 -e OPENAI_API_KEY=your_key --name chat-with-gpt wsng911/chat-with-gpt:latest
```

访问 `http://localhost:3000`
