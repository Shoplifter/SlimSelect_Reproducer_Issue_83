# SlimSelect_Reproducer_Issue_83
Reproducer for SlimSelect [Issue #83](https://github.com/brianvoe/slim-select/issues/89)

How to reporduce

- Initially without AJAX and with AJAX should look the same, but preselected options in with AJAX do not show up.
- Focus with AJAX and search for CT - the preselected option shows up, but without badge
- Select CT B (or any other option) - the new selected option shows up with badge
- Press submit
- The value for CT (1) is submitted twice.
- Refresh page - do nothing - just submit - The value for CT (1) is submitted twice.
- Refresh page - search for CT - do or do not select CT - submit - The value for CT (1) is (correctly) submitted only once.
