Ciphering CLI Tool

To start application you should enter node src/index.js ${your pattern} in command line.

To run tests you should install `jest` with npm i and then enter `jest` in project folder.

To check tests coverage you should enter `jest --coverage`

Valid input arguments:

    Required
    -c or --config ${config pattern} - Config for encoding/decoding

    Optional

    -i or --input ${path to file} - Path for input file

    -o or --output ${path to file} - Path for output file

Example of usage:

    node src/index.js -c "C1-C1-R0-A" -o "./src/output.txt"

    node src/index.js --config "C1-C0-A-R1-R0-A-R0-R0-C1-A" --input "./src/input.txt" --output "./src/output.txt"