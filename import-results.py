import json
import re
import argparse

# Function to clean and format line
def format_line(line):
    # Remove any leading numbers followed by a colon and space
    cleaned_line = re.sub(r'^\d+:\s*', '', line)
    # Create a key in lowercase and remove spaces and special characters
    key = cleaned_line.lower().replace(' ', '').replace(':', '').replace('(', '').replace(')', '')
    return key, cleaned_line

def main():
    # Set up argument parser
    parser = argparse.ArgumentParser(description='Convert lines from an input file to a JSON format wrapped in a JavaScript variable declaration.')
    parser.add_argument('input_file', type=str, help='Path to the input file containing the lines.')
    parser.add_argument('output_file', type=str, help='Path to the output file.')

    # Parse command-line arguments
    args = parser.parse_args()

    # Read lines from input file
    with open(args.input_file, 'r') as file:
        lines = file.readlines()

    # Convert lines to the desired JSON format
    formatted_lines = {
        format_line(line.strip())[0]: {
            "display": format_line(line.strip())[1]
        } for line in lines if line.strip()
    }

    # Convert to JSON string
    json_content = json.dumps(formatted_lines, indent=4)

    # Format as JavaScript variable declaration
    js_output = f"let library = {json_content};\n"

    # Write to output file
    with open(args.output_file, 'w') as file:
        file.write(js_output)

    print(f"JavaScript variable declaration has been written to {args.output_file}.")

if __name__ == '__main__':
    main()

