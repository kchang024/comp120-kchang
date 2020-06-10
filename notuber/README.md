    README.md
    COMP120 Summer 2020

    Assignment    : Lab 8 - The Ride-Hailing Service, Part 1
    Author        : Kevin Chang
    Date          : 06-10-2020

    Correct Implementation/ Incorrect Implementation:
    -------------------------------------------------
	I believe everything has been correctly implemented per the spec.

    The only thing I was concerned about was that a line in the head section
    is over 80 lines long. I had trouble displaying the src on multiple
    lines.

    While testing through the SimpleHTTP python server, I noticed that there is
    always a request for favicon.ico which results in a 404 because I don't 
    use it. 

    Acknowledgements/collaborated:
    ------------------------------
    N/A
	        
    Hours spent completing the lab:
    ------------------------------
	4 HRS

    Performance Enhancements
    ------------------------

    Pre optimization -
        Load times: As a test I loaded the page 3 separate times, all in
                    incognito so the cache/history was cleared. 

                    The load times were:
                    5.70s, 5.54s, 5.52s

        File sizes: index.html = 391 B
                    style.css  = 79 B
                    ride.js    = 1.34 KB

        Requests:   21

    *** Used yuicompressor to minify the CSS/JS files ***

    Post optimization -
        Load times: This was also done in incognito so 
                    the cache/history was cleared. 

                    The load times were:
                    5.75s, 5.63s, 5.46s

        File sizes: index.html = 389 B
                    style.css  = 58 B
                    ride.js    = 735 B

        Requests:   21

    Seems like optimizing had a great effect on the size of the files and a 
    minor effect on the overall load time. 
    I think had the file been larger we would have seen a dramatic 
    increase in load times. But overall it seemed like the optimizations had 
    a net positive effect. 
    It reduced the size of content to deliver.
    The requests stayed the same, there wasn't a reduction in number of files
    (no files were combined for optimization), so it makes sense.