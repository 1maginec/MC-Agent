from openai import OpenAI

# 创建客户端时指定自定义的 base URL
client = OpenAI(
    api_key="sk-air6d65bcedad767e260dc8aff17f3d6ca39eeeb4613Sotw",# 您在 2233 创建的 key
    base_url="https://api.gptsapi.net/v1"  # 我们提供的 url
)

# 发送请求
response = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
        {
            "role": "user",
            "content": "Hello!"
        }
    ]
)

# 打印返回结果
print(response.choices[0].message.content)