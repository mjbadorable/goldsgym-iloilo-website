#!/usr/bin/env python3
"""Gold's Gym Iloilo promo edit -> landscape + portrait. Sources are never modified.
Usage: python3 build_promo.py <src_dir_with_c1.mp4,c2.mp4,c3.mp4> <out_dir>"""
import subprocess, sys, os
SRC, OUT = sys.argv[1], sys.argv[2]; os.makedirs(OUT, exist_ok=True)
F = {k: f"{SRC}/{k}.mp4" for k in ("c1","c2","c3")}
# slot boundaries come from clip 2's own beat-synced cuts; its music bed drives the edit
# (clip, src_start, slot_start, slot_end, speed, join_dissolve_into_this_seg)
S = [
 ("c3", 26.85,  0.00,  2.38, 1.00, 0.00),   # exterior establishing shot (fade in from black)
 ("c3",  7.95,  2.38,  3.85, 1.00, 0.15),   # dumbbell rack / hex ceiling
 ("c3",  4.30,  3.85,  5.32, 1.00, 0.15),   # cardio bike
 ("c1",  4.00,  5.32,  6.93, 0.83, 0.15),   # group class (slowed 17% to fit beat)
 ("c3", 19.70,  6.93,  8.42, 1.00, 0.15),   # cable station, THE MECCA wall
 ("c2",  8.42,  8.42,  9.85, 1.00, 0.15),   # c2 cinematic strength block (native cuts)
 ("c3", 22.00,  9.85, 11.37, 1.00, 0.15),   # machine press
 ("c2", 11.37, 11.37, 15.87, 1.00, 0.15),
 ("c1", 31.70, 15.87, 17.13, 1.00, 0.15),   # leg press
 ("c2", 17.13, 17.13, 22.05, 1.00, 0.15),
 ("c1", 36.70, 22.05, 24.97, 1.00, 0.45),   # logo end card (2.1s + freeze hold)
]
GRADE = {
 "c1": "eq=saturation=0.90:contrast=1.04",
 "c2": "eq=saturation=1.05:contrast=1.02",
 "c3": "eq=gamma=1.12:saturation=1.06:contrast=1.03",
}
def seg_filter(i, clip, ss, dur, speed, d_out, fmt):
    pre = f"[{i}:v]setpts=(PTS-STARTPTS)/{speed},fps=30,hqdn3d=1.5:1.2:4:3,{GRADE[clip]},"
    if clip=="c1" and ss>36: pre += f"tpad=stop_mode=clone:stop_duration=1.5,"
    pre += f"trim=duration={dur+d_out:.3f},setpts=PTS-STARTPTS,"
    if fmt=="p":
        body = ("scale=1080:1920:force_original_aspect_ratio=increase:flags=lanczos,crop=1080:1920,"
                "unsharp=5:5:0.55:5:5:0,setsar=1,format=yuv420p")
        return f"{pre}{body}[v{i}]"
    # landscape: sharp upscaled subject at full height over a soft blurred fill of the same shot
    return (f"{pre}split[a{i}][b{i}];"
            f"[a{i}]scale=480:270:force_original_aspect_ratio=increase,crop=480:270,gblur=sigma=10,"
            f"scale=1920:1080:flags=bicubic,eq=brightness=-0.10:saturation=1.1[bg{i}];"
            f"[b{i}]scale=-2:1080:flags=lanczos,unsharp=5:5:0.55:5:5:0[fg{i}];"
            f"[bg{i}][fg{i}]overlay=(W-w)/2:0,setsar=1,format=yuv420p[v{i}]")
def build(fmt, outfile):
    cmd = ["ffmpeg","-y","-v","error"]
    for clip,ss,t0,t1,sp,d in S:
        d_next = 0
        cmd += ["-ss",f"{ss:.3f}","-t",f"{(t1-t0)*sp+1.0:.3f}","-i",F[clip]]
    cmd += ["-i",F["c2"]]; ai=len(S)
    parts=[]
    for i,(clip,ss,t0,t1,sp,d) in enumerate(S):
        d_out = S[i+1][5] if i+1<len(S) else 0
        parts.append(seg_filter(i,clip,ss,t1-t0,sp,d_out,fmt))
    cur="v0"
    for i in range(1,len(S)):
        T=S[i][2]; d=S[i][5]
        parts.append(f"[{cur}][v{i}]xfade=transition=fade:duration={d}:offset={T:.3f}[x{i}]"); cur=f"x{i}"
    total=S[-1][3]
    parts.append(f"[{cur}]fade=t=in:st=0:d=0.6,fade=t=out:st={total-0.4:.2f}:d=0.4,"
                 f"colorbalance=rs=0.015:bs=-0.015[vout]")
    parts.append(f"[{ai}:a]atrim=0:{total},asetpts=PTS-STARTPTS,highpass=f=40,"
                 f"loudnorm=I=-14:TP=-1.5:LRA=9,afade=t=in:d=0.3,afade=t=out:st={total-1.3:.2f}:d=1.3[aout]")
    cmd += ["-filter_complex",";".join(parts),"-map","[vout]","-map","[aout]","-t",f"{total}",
            "-c:v","libx264","-preset","slow","-crf","17","-maxrate","16M","-bufsize","32M","-pix_fmt","yuv420p",
            "-profile:v","high","-r","30","-movflags","+faststart","-c:a","aac","-b:a","192k","-ar","48000",outfile]
    subprocess.run(cmd,check=True)
build("l", f"{OUT}/GoldsGym_Iloilo_Promo_Landscape_1920x1080.mp4")
build("p", f"{OUT}/GoldsGym_Iloilo_Promo_Portrait_1080x1920.mp4")
