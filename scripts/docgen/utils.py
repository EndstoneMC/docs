import subprocess
import shutil


def clang_format(code: str, binary=None, cwd=None) -> str:
    """
    Format a C/C++/ObjC/etc. code string with clang-format and return the formatted code.
    """
    binary = binary or shutil.which("clang-format") or shutil.which("clang-format.exe")
    if not binary:
        raise FileNotFoundError("clang-format not found on PATH")

    cmd = [binary, "--style=file"]
    p = subprocess.run(
        cmd,
        input=code.encode("utf-8"),
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        cwd=cwd,
    )
    if p.returncode != 0:
        raise RuntimeError(p.stderr.decode("utf-8"))
    return p.stdout.decode("utf-8")
