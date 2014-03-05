page based indexing:
  - download_pages.sh
  - index_pages.sh
page and item based indexing:
  - download_pages.sh
  - trim_and_merge.sh
  - sed -r 's@<b>.{2,30}</b><br><br>.{2,30}</b><br><br>@\n&@g' all.txt > pre_split.txt
  - ./split_items.awk pre_split.txt
  - index_pages.sh
