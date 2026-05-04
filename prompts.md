# chat-with-gpt Prompts

> 项目：cogentapps/chat-with-gpt
> 技术栈：React + TypeScript + Node.js，支持语音输入/输出的开源 ChatGPT 客户端

---

## 功能迭代

**1. 添加对话分支功能**
在 chat-with-gpt 中添加对话分支功能。用户可以在任意消息处创建分支，探索不同的对话方向，分支以树形结构展示，用户可以在不同分支间切换，每个分支独立保存。

**2. 支持本地 Ollama 模型**
在 chat-with-gpt 中添加 Ollama 本地模型支持。用户可以在设置中配置 Ollama 服务地址，选择本地已安装的模型（如 llama3、mistral），实现完全离线的 AI 对话，无需 OpenAI API Key。

**3. 添加对话模板功能**
在 chat-with-gpt 中添加 System Prompt 模板库。用户可以创建和保存常用的 System Prompt（如"代码审查助手"、"翻译助手"），新建对话时从模板库选择，快速切换 AI 角色。

**4. 支持图片输入（多模态）**
在 chat-with-gpt 中添加图片上传功能，支持将图片发送给支持视觉的模型（如 GPT-4V）。用户可以拖拽或粘贴图片到输入框，图片以 base64 格式编码后发送给 API。

**5. 添加对话导出功能**
在 chat-with-gpt 中添加对话导出功能，支持将对话历史导出为 Markdown、PDF 或 JSON 格式。导出时保留完整的对话内容、时间戳和模型信息，方便用户存档和分享。

---

## Bug 修复

**6. 修复长对话时 Token 超限导致请求失败**
在 chat-with-gpt 中，当对话历史过长超过模型 Token 限制时，API 请求会失败并显示错误。请实现自动截断策略，保留最近的 N 条消息，确保总 Token 数不超过模型限制。

**7. 修复语音输入在 Safari 中不工作**
在 chat-with-gpt 中，语音输入功能在 Safari 浏览器中无法使用，因为 Safari 对 Web Speech API 的支持有限制。请检测浏览器兼容性，在不支持的浏览器中显示友好提示。

**8. 修复代码块中的代码无法正确复制**
在 chat-with-gpt 中，AI 回复中的代码块复制按钮有时复制的内容包含多余的空格或换行符。请检查代码块内容的提取逻辑，确保复制的代码与显示的完全一致。

**9. 修复流式输出中断后无法继续**
在 chat-with-gpt 中，当流式输出（Streaming）因网络问题中断时，无法继续接收剩余内容，也没有重试机制。请添加流式输出的断点续传或自动重试功能。

**10. 修复多标签页同时使用时对话混乱**
在 chat-with-gpt 中，在多个浏览器标签页同时使用时，不同标签页的对话状态会相互干扰。请使用 localStorage 的 `storage` 事件实现标签页间的状态同步。

---

## 重构

**11. 将 API 调用层抽象为可替换的 Provider**
chat-with-gpt 目前直接调用 OpenAI API。请将 API 调用抽象为 `AIProvider` 接口，OpenAI 作为默认实现，便于后续添加 Anthropic Claude、Google Gemini 等其他 Provider。

**12. 将对话状态管理迁移到 Zustand**
chat-with-gpt 使用 React Context 管理对话状态，随着功能增加变得复杂。请将对话列表、当前对话、设置等全局状态迁移到 Zustand store，提升状态管理的可维护性。

---

## 测试

**13. 为 OpenAI API 调用层编写单元测试**
使用 Jest + MSW 为 chat-with-gpt 的 OpenAI API 调用层编写单元测试，覆盖：普通对话请求、流式输出处理、Token 超限错误、网络超时、API Key 无效错误。

**14. 为对话历史管理编写单元测试**
为 chat-with-gpt 的对话历史管理逻辑编写单元测试，覆盖：创建新对话、添加消息、删除消息、清空对话、对话持久化到 localStorage、从 localStorage 恢复对话。

**15. 为聊天界面编写 E2E 测试**
使用 Playwright 为 chat-with-gpt 编写端到端测试，覆盖：输入消息并发送、接收 AI 回复（Mock API）、复制代码块、新建对话、切换历史对话、修改设置（模型/温度）。

---

## 代码理解

**16. 解释 chat-with-gpt 的流式输出实现**
在 chat-with-gpt 中，AI 回复的流式输出（Streaming）是如何实现的？前端如何处理 Server-Sent Events 或 ReadableStream？如何在流式输出过程中实时更新 UI？流式输出中断时如何处理？

**17. 解释 chat-with-gpt 的语音功能实现**
在 chat-with-gpt 中，语音输入和语音输出分别是如何实现的？语音输入使用了哪个 API（Web Speech API 还是 Whisper API）？语音输出使用了哪个 TTS 服务？如何处理不同语言的语音识别？

---

## DevOps

**18. 编写 GitHub Actions 自动构建流水线**
为 chat-with-gpt 编写 `.github/workflows/docker-build.yml`，实现推送 main 分支时自动构建多架构（amd64/arm64）Docker 镜像并推送到 Docker Hub，使用 npm 缓存加速构建。

**19. 编写 docker-compose.yml 生产部署配置**
为 chat-with-gpt 编写 `docker-compose.yml`，包含：chat-with-gpt 服务（映射 3000 端口）、数据目录挂载（`./data:/app/data`）、环境变量配置（OPENAI_API_KEY、PORT）、健康检查、自动重启。

**20. 编写 Nginx 反向代理配置**
为 chat-with-gpt 编写 Nginx 反向代理配置，包含：HTTPS 终止（Let's Encrypt）、WebSocket 代理支持（流式输出需要）、请求超时配置（AI 响应可能较慢）、安全响应头配置。

---

## 构建与截图命令

**构建截图：**
```bash
cd /path/to/chat-with-gpt && docker build -t chat-with-gpt-test .
```

**网页截图：**
```bash
docker run -d -p 3000:3000 --name chat-with-gpt-test chat-with-gpt-test && sleep 3 && open http://localhost:3000
```

**清理：**
```bash
docker rm -f chat-with-gpt-test && docker rmi chat-with-gpt-test
```
