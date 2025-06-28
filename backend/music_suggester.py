from transformers import AutoTokenizer, AutoModelForCausalLM
import torch

# Load model và tokenizer 1 lần duy nhất khi khởi tạo
model_name = "Ayushsingh1009/Spotify-song"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

def suggest_music(prompt_info: dict) -> str:
    # Build prompt từ dict
    prompt = f"""Below is an instruction that describes a task, paired with an input that provides further context. Write a response that appropriately completes the request.
### Instruction:
Based on the song metadata provided, describe the mood, style, and characteristics of the track.
### Input:
Song: [Custom Track]
Artist: [Color AI]
Genre: {prompt_info.get('genre', 'ambient')}
Release Date: {prompt_info.get('release', '2022')}
Key: {prompt_info.get('key', 'C Maj')}
Tempo: {prompt_info.get('tempo', '60 BPM')}
Loudness: -12 dB
Explicit: No
Emotion: {prompt_info.get('emotion', '')}
### Response:"""

    # Token hóa & sinh văn bản
    inputs = tokenizer(prompt, return_tensors="pt")
    outputs = model.generate(**inputs, max_new_tokens=150)
    result = tokenizer.decode(outputs[0], skip_special_tokens=True)

    # Trích phần phản hồi
    return result.split("### Response:")[-1].strip()
