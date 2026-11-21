#!/usr/bin/env python3
"""Combine the three Gold's Gym clips IN FULL (no recutting) into landscape + portrait masters.
Order: clip3 (title/intro) -> clip2 -> clip1 (ends on logo card). Sources are never modified.
Usage: build_combined.py <src_dir with c1.mp4 c2.mp4 c3.mp4> <out_dir> [landscape|portrait]"""
import subprocess, sys, os, json
SRC, OUT = sys.argv[1], sys.argv[2]; which = sys.argv[3] if len(sys.argv)>3 else "both"
os.makedirs(OUT, exist_ok=True)
ORDER = ["c3","c2","c1"]; D = 0.6  # dissolve length between clips
GRADE = {"c1":"eq=saturation=0.92:contrast=1.03",
         "c2":"eq=saturation=1.04:contrast=1.02",
         "c3":"eq=gamma=1.10:saturation=1.05:contrast=1.03"}
def vdur(p):
    return float(subprocess.check_output(["ffprobe","-v","error","-select_streams","v:0",
        "-show_entries","stream=duration","-of","csv=p=0",p]).decode().strip())
dur = {k: vdur(f"{SRC}/{k}.mp4") for k in ORDER}
def vf(i, clip, fmt):
    pre = f"[{i}:v]fps=30,setpts=PTS-STARTPTS,hqdn3d=1.5:1.2:4:3,{GRADE[clip]},"
    if fmt=="p":
        return pre+"scale=1080:1920:force_original_aspect_ratio=increase:flags=lanczos,crop=1080:1920,unsharp=5:5:0.5:5:5:0,setsar=1,format=yuv420p[v%d]"%i
    return (pre+f"split[a{i}][b{i}];"
        f"[a{i}]scale=480:270:force_original_aspect_ratio=increase,crop=480:270,gblur=sigma=10,scale=1920:1080,eq=brightness=-0.10:saturation=1.1[bg{i}];"
        f"[b{i}]scale=-2:1080:flags=lanczos,unsharp=5:5:0.5:5:5:0[fg{i}];"
        f"[bg{i}][fg{i}]overlay=(W-w)/2:0,setsar=1,format=yuv420p[v{i}]")
def build(fmt, outfile):
    cmd=["ffmpeg","-y","-v","error"]
    for k in ORDER: cmd += ["-i",f"{SRC}/{k}.mp4"]
    parts=[]
    for i,k in enumerate(ORDER):
        parts.append(vf(i,k,fmt))
        parts.append(f"[{i}:a]atrim=0:{dur[k]:.3f},asetpts=PTS-STARTPTS,highpass=f=40,loudnorm=I=-14:TP=-1.5:LRA=11,aresample=48000[a{i}]")
    cv, ca, acc = "v0", "a0", dur[ORDER[0]]
    for i in range(1,len(ORDER)):
        parts.append(f"[{cv}][v{i}]xfade=transition=fade:duration={D}:offset={acc-D:.3f}[x{i}]")
        parts.append(f"[{ca}][a{i}]acrossfade=d={D}:c1=tri:c2=tri[ax{i}]")
        cv, ca, acc = f"x{i}", f"ax{i}", acc + dur[ORDER[i]] - D
    parts.append(f"[{cv}]fade=t=in:st=0:d=0.5,fade=t=out:st={acc-0.6:.2f}:d=0.6,colorbalance=rs=0.015:bs=-0.015[vout]")
    parts.append(f"[{ca}]afade=t=in:d=0.4,afade=t=out:st={acc-1.2:.2f}:d=1.2[aout]")
    cmd += ["-filter_complex",";".join(parts),"-map","[vout]","-map","[aout]","-t",f"{acc:.3f}",
            "-c:v","libx264","-preset","medium","-crf","18","-maxrate","14M","-bufsize","28M","-pix_fmt","yuv420p",
            "-profile:v","high","-r","30","-movflags","+faststart","-c:a","aac","-b:a","192k",outfile]
    subprocess.run(cmd,check=True)
if which in ("both","landscape"): build("l",f"{OUT}/GoldsGym_Iloilo_Combined_Landscape_1920x1080.mp4")
if which in ("both","portrait"):  build("p",f"{OUT}/GoldsGym_Iloilo_Combined_Portrait_1080x1920.mp4")
