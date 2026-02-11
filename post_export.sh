# Replace font
find export/patch -type f -print0 | xargs -0 sed -i 's/JF-Dot-AyuMin-18/Arial/g'

# Apply manual patch
rsync -av patch_manual/ export/patch/
