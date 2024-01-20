import os
import base64

current_dir = os.getcwd()
input_dir = os.path.join(current_dir, 'output/20210119001723/T1GC_png_slice')
output_base64_dir = 'output/20210119001723/T1GC_base64_slice'
os.makedirs(output_base64_dir, exist_ok=True)  # 创建输出文件夹


for filename in os.listdir(input_dir):
    print(filename)

    if filename.endswith('.png'):
        file_path = os.path.join(input_dir, filename)


        with open(file_path, 'rb') as f:
            image_data = f.read()
            encoded_image = base64.b64encode(image_data).decode('utf-8')


        output_file = os.path.join(output_base64_dir, f'{filename}.txt')


        with open(output_file, 'w') as f:
            f.write(encoded_image)

        print(f'Converted {filename} to Base64 and saved as {output_file}')