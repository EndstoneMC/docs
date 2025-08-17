import argparse
from pathlib import Path

import cppgen
import pygen

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "base_dir", type=Path, help="Base directory for code generation"
    )
    parser.add_argument(
        "--language",
        type=str,
        choices=["python", "cpp"],
        help="Language to generate code for (default: both)",
    )
    args = parser.parse_args()

    if args.language == "python" or args.language is None:
        pygen.generate(args.base_dir)

    if args.language == "cpp" or args.language is None:
        cppgen.generate(args.base_dir)
