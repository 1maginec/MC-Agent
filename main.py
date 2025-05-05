from voyager import Voyager
import os
openai_api_key = "sk-air6d65bcedad767e260dc8aff17f3d6ca39eeeb4613Sotw"
deepseek_api_key = "sk-86fbe08493f54462acc9ef77381d7a0d"
os.environ["DEEPSEEK_API_KEY"] = deepseek_api_key
voyager = Voyager(
    mc_port = 51913,
    openai_api_key=openai_api_key,
    action_agent_model_name="deepseek-chat",
    # env_request_timeout=60
    resume=False,
    skill_library_dir="./skill_library/trial1",
    curriculum_agent_mode="manual"
)
#print(voyager.action_agent.llm)
voyager.learn()
