from voyager import Voyager

openai_api_key = "sk-air6d65bcedad767e260dc8aff17f3d6ca39eeeb4613Sotw"

voyager = Voyager(
    mc_port = 54208,
    openai_api_key=openai_api_key,
    resume=True
)

voyager.learn()
