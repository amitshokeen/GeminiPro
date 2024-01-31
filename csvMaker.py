import csv
# Specify the file path
file_path = './output_new_prompt.txt'

# Open the file and read its contents into a string
with open(file_path, 'r', encoding='utf-8') as file:
    text = file.read()
import re

# Regular expression pattern for splitting
pattern = r'\|(\d+)\|'

# Split the text based on the pattern
result_array = re.split(pattern, text)

# Filter out empty strings and remove leading/trailing whitespaces
result_array = ['|{}| {}'.format(result_array[i], result_array[i + 1].strip()) for i in range(1, len(result_array), 2)]

# Now, file_contents contains the content of the file as a string
#print(file_contents)

# Sample array of text values
#text_array = ['|0| Title: Russian-Ukraine \n\nThe conflict between Russia and Ukraine,', '|1| Title: Baseball News \n\nSummary: New York Yankees,', '|2| **BTS Leader \n\nBTS leader RM, also known as Kim Namjoon,,', "|3| Title: Artist's Sketchbook\n\nIn a recent social media post.,", '|4| Title: Leclerc Excuses\n\nSummary:\nDespite Mercedes.']
text_array = result_array
# Specify the CSV file path
csv_file_path = 'output_new_prompt.csv'

# Open the CSV file for writing
with open(csv_file_path, 'w', newline='', encoding='utf-8') as csv_file:
    # Create a CSV writer
    csv_writer = csv.writer(csv_file, delimiter=',')

    # Write header
    csv_writer.writerow(['Index', 'Title', 'Content'])

    # Write each text value as a separate row in the CSV file
    for index, text_value in enumerate(text_array):
        # Extract the index and title from the text
        index_part, title_part, content_part = map(str.strip, text_value.split('|', 2))

        # Write the row to the CSV file
        csv_writer.writerow([index_part, title_part, content_part])

print(f'CSV file "{csv_file_path}" has been created.')