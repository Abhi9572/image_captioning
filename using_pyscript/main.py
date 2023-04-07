from flask import Flask, request, render_template
from PIL import Image
import io
import clip
import torch
from transformers import GPT2Tokenizer, GPT2LMHeadModel

app = Flask(__name__)

# Load pre-trained models
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
clip_model, _ = clip.load("ViT-B/32", device=device)
gpt2_model = GPT2LMHeadModel.from_pretrained("gpt2")
gpt2_model.to(device)
tokenizer = GPT2Tokenizer.from_pretrained("gpt2")

# Caption generation function
def generate_caption(image):
    # Encode the image using CLIP
    with torch.no_grad():
        image_tensor = torch.FloatTensor(image).permute(2, 0, 1).unsqueeze(0).to(device)
        image_features = clip_model.encode_image(image_tensor)

        # Generate caption using GPT-2
        prompt = tokenizer.decode(image_features.cpu().numpy().tolist()[0])
        caption = generate_beam(gpt2_model, tokenizer, prompt=prompt)

    return caption

# Flask routes
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/caption', methods=['POST'])
def generate_caption():
    # Get image from HTML form
    image_file = request.files['image']
    image = Image.open(io.BytesIO(image_file.read())).convert('RGB')

    # Generate caption
    caption = generate_caption(image)

    return render_template('caption.html', caption=caption)

if __name__ == '__main__':
    app.run(debug=True)