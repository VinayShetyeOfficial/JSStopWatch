// On page load
window.onload = function () {
    // Initialize variables for microseconds, milliseconds, seconds, minutes, and hours
    var microseconds = 0;
    var millseconds = 0;
    var seconds = "0" + 0;
    var minutes = "0" + 0;
    var hours = "0" + 0;

    // Get elements from HTML by their ID
    var buttonStartPause = document.getElementById('button-start');
    var buttonSplit = document.getElementById('button-split');
    var buttonReset = document.getElementById('button-reset');

    var appendMicro = document.getElementById('micro');
    var appendMilli = document.getElementById('milli');
    var appendSeconds = document.getElementById('seconds');
    var appendMinutes = document.getElementById('minutes');
    var appendHours = document.getElementById('hours');

    // Declare variables for setInterval
    var Interval_StartTimer;
    var Interval_IncrementMicroSecond; // - For Simulation of microseconds 
    var Interval_IncrementMilli;
    var Interval_IncrementSeconds;

    var timings = document.getElementById('timings');

    // On click of start/pause button
    buttonStartPause.onclick = function () {

        /*--- TOGGLE BETWEEN START/PAUSE ---*/
        // If button says "Pause"
        if (buttonStartPause.innerHTML == "Pause") {

            /* --- PAUSE TIMER ---*/
            // Clear all intervals and change button text to "Start"
            clearInterval(Interval_IncrementMicroSecond);
            clearInterval(Interval_StartTimer);

            buttonStartPause.innerHTML = "Start";

            /*--- Disable Split Button ---*/
            buttonSplit.disabled = true;
            buttonSplit.style.cursor = "not-allowed";

            /*--- Enable Reset Button ---*/
            buttonReset.disabled = false;
            buttonReset.style.cursor = "pointer";
        }
        // If button says "Start"
        else {

            /* --- START TIMER ---*/
            // Clear all intervals, start the timer, and change button text to "Pause"
            clearInterval(Interval_IncrementMicroSecond);
            clearInterval(Interval_StartTimer);

            Interval_IncrementMicroSecond = setInterval(startMicro, 0.1)
            Interval_StartTimer = setInterval(startTimer, 100);

            buttonStartPause.innerHTML = "Pause";

            /*--- Enable Split Button ---*/
            buttonSplit.disabled = false;
            buttonSplit.style.cursor = "pointer";

            /*--- Disable Reset Button ---*/
            buttonReset.disabled = true;
            buttonReset.style.cursor = "not-allowed";
        }
    }

    // Variable to keep track of milliseconds for time stamp
    var milliseconds_counter = 0;

    /*--- MICRO SECONDS Simulation ---*/

    // Function to simulate microseconds
    function startMicro() {
        // Increment microseconds and add leading zero
        ++microseconds;

        if (microseconds <= 9) {
            microseconds = "0" + microseconds;
        }

        if (microseconds > 99) {
            /* Reset Microseconds */
            // Reset microseconds and add leading zero
            microseconds = 0;
            microseconds = "0" + microseconds;
        }

        appendMicro.innerHTML = microseconds;

        /*--- Used only for printing in TimeStamp ---*/
        ++milliseconds_counter;

        /* Check if milliseconds counter is less than 9 */
        if (milliseconds_counter < 9) {
            /* Add leading zeroes to milliseconds */
            milliseconds_counter = "0" + "0" + milliseconds_counter;
        }

        /* Check if milliseconds counter is between 9 and 99 */
        if (milliseconds_counter > 9 && milliseconds_counter <= 99) {
            /* Add leading zero to milliseconds */
            milliseconds_counter = "0" + milliseconds_counter;
        }

        /* Check if milliseconds counter is greater than 999 */
        if (milliseconds_counter > 999) {
            /* Reset milliseconds counter */
            milliseconds_counter = 0;
            /* Add leading zeroes to milliseconds */
            milliseconds_counter = "0" + "0" + milliseconds_counter;

        }
    }

    /*--- START TIMER ---*/
    function startTimer() {

        /*--- MILLI SECONDS ---*/

        /* Increment Milliseconds */
        ++millseconds;

        /* Check if milliseconds is greater than 9 */
        if (millseconds > 9) {

            /*--- SECONDS ---*/

            /* Increment Seconds */
            ++seconds;

            /* Check if seconds is less than or equal to 9 */
            if (seconds <= 9) {
                /* Add leading zero to seconds */
                seconds = "0" + seconds;
            }

            /* Check if seconds is greater than 59 */
            if (seconds > 59) {

                /* Reset Seconds */

                seconds = 0;
                /* Add leading zero to seconds */
                seconds = "0" + seconds;

                /*--- MINUTES ---*/

                /* Increment Minutes */
                ++minutes;

                /* Check if minutes is less than or equal to 9 */
                if (minutes <= 9) {
                    /* Add leading zero to minutes */
                    minutes = "0" + minutes;
                }

                /* Check if minutes is greater than 59 */
                if (minutes > 59) {

                    /* Reset Minutes */

                    minutes = 0;
                    /* Add leading zero to minutes */
                    minutes = "0" + minutes;

                    /*--- HOURS ---*/

                    /* Increment hours */
                    ++hours;

                    /* Check if hours is less than or equal to 9 */
                    if (hours <= 9) {
                        /* Add leading zero to hours */
                        hours = "0" + hours;
                    }

                    /* Update hours in HTML */
                    appendHours.innerHTML = hours + ":";
                }

                /* Update minutes in HTML */
                appendMinutes.innerHTML = minutes + ":";
            }

            /* Update seconds in HTML */
            appendSeconds.innerHTML = seconds + ".";

            /* Reset Milliseconds */
            millseconds = 0;
        }

        /* Update milliseconds in HTML */
        appendMilli.innerHTML = millseconds;
    }


    /*--- SPLIT TIMINGS ---*/

    var splitNo = 0;
    var timingsTable = document.getElementById("timings");

    timingsTable.innerHTML = "";

    /*--- TimeStamp ---*/

    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    buttonSplit.onclick = function () {

        const d = new Date();
        day = days[d.getDay()];
        date = d.getDate();
        month = months[d.getMonth() + 1];
        year = d.getFullYear();

        hour = d.getHours();
        if (hour < 9) {
            hour = "0" + hour;
        }
        min = d.getMinutes();
        if (min < 9) {
            min = "0" + min;
        }
        sec = d.getSeconds();
        if (sec < 9) {
            sec = "0" + sec;
        }
        milli = d.getMilliseconds();
        if (milli < 9) {
            milli = "0" + "0" + milli;
        }
        if (milli > 9 && milli <= 99) {
            milli = "0" + milli
        }

        timingsTable.innerHTML +=
            "<tr>" +
            "<td>" + "#" + (++splitNo) + "</td>" +
            "<td>" + hours + ":" + minutes + ":" + seconds + "." + milliseconds_counter + "</td>" +
            "<td>" + day + ", " + date + " " + month + " " + year + ", " + hour + ":" + min + ":" + sec + "." + milli + "</td>" +
            "</tr>";
    }

    /*--- RESET TIMER ---*/

    buttonReset.onclick = function () {

        if (window.confirm("Are you sure?\nAll timings will be lost when you reset.")) {

            /* Reset hours */
            hours = 0;
            appendHours.innerHTML = "0" + hours + ":";

            /* Reset minutes */
            minutes = 0;
            appendMinutes.innerHTML = "0" + minutes + ":";

            /* Reset seconds */
            seconds = 0;
            appendSeconds.innerHTML = "0" + seconds + ".";

            /* Reset milliseconds */
            milliseconds = 0;
            appendMilli.innerHTML = milliseconds;

            /* Reset microseconds */
            microseconds = 0;
            appendMicro.innerHTML = "0" + microseconds;

            /*--- Disable Reset Button ---*/
            buttonReset.disabled = true;
            buttonReset.style.cursor = "not-allowed";

            /*--- Clear split timings table ---*/
            timingsTable.innerHTML = "";

            /*--- Reset split no. ---*/
            splitNo = 0;
        }

    }

}