/* =========================================================
   SORTING & SEARCHING VISUALIZER
   Main JavaScript
========================================================= */


/* =========================================================
   1. GLOBAL STATE
========================================================= */

let array = [];

let isRunning = false;
let isPaused = false;

let currentRunId = 0;

let currentStepIndex = 0;

let currentSteps = [];

let currentComparisons = 0;
let currentStepsCount = 0;

let algorithmStartTime = 0;
let algorithmEndTime = 0;

let currentAlgorithm = "merge";

let animationSpeed = 400;


/* =========================================================
   2. DOM ELEMENTS
========================================================= */

const algorithmSelect =
    document.getElementById("algorithmSelect");

const arraySize =
    document.getElementById("arraySize");

const arraySizeValue =
    document.getElementById("arraySizeValue");

const searchTarget =
    document.getElementById("searchTarget");

const searchTargetGroup =
    document.getElementById("searchTargetGroup");

const speedControl =
    document.getElementById("speedControl");

const customArray =
    document.getElementById("customArray");

const applyArrayBtn =
    document.getElementById("applyArrayBtn");

const generateBtn =
    document.getElementById("generateBtn");

const startBtn =
    document.getElementById("startBtn");

const pauseBtn =
    document.getElementById("pauseBtn");

const resetBtn =
    document.getElementById("resetBtn");

const statusMessage =
    document.getElementById("statusMessage");

const visualizationTitle =
    document.getElementById("visualizationTitle");

const algorithmState =
    document.getElementById("algorithmState");

const arrayVisualization =
    document.getElementById("arrayVisualization");

const stepsCount =
    document.getElementById("stepsCount");

const comparisonsCount =
    document.getElementById("comparisonsCount");

const executionTime =
    document.getElementById("executionTime");

const currentArraySize =
    document.getElementById("currentArraySize");

const operationTitle =
    document.getElementById("operationTitle");

const operationDescription =
    document.getElementById("operationDescription");

const resultContent =
    document.getElementById("resultContent");

const algorithmInfoTitle =
    document.getElementById("algorithmInfoTitle");

const algorithmInfoDescription =
    document.getElementById("algorithmInfoDescription");

const algorithmApproach =
    document.getElementById("algorithmApproach");

const bestCase =
    document.getElementById("bestCase");

const averageCase =
    document.getElementById("averageCase");

const worstCase =
    document.getElementById("worstCase");

const spaceComplexity =
    document.getElementById("spaceComplexity");

const algorithmRequirement =
    document.getElementById("algorithmRequirement");

const howItWorksText =
    document.getElementById("howItWorksText");


/* =========================================================
   3. ALGORITHM INFORMATION
========================================================= */

const algorithmInformation = {

    merge: {

        name: "Merge Sort",

        description:
            "Merge Sort divides the array into smaller subarrays, sorts them and merges them back together.",

        approach:
            "Divide and Conquer",

        best:
            "O(n log n)",

        average:
            "O(n log n)",

        worst:
            "O(n log n)",

        space:
            "O(n)",

        requirement:
            "No special requirement",

        how:
            "The array is repeatedly divided into smaller sections. These sections are sorted and then merged while comparing their values."

    },


    quick: {

        name: "Quick Sort",

        description:
            "Quick Sort selects a pivot and partitions the array so that smaller values move to one side and larger values move to the other.",

        approach:
            "Divide and Conquer",

        best:
            "O(n log n)",

        average:
            "O(n log n)",

        worst:
            "O(n²)",

        space:
            "O(log n) average",

        requirement:
            "No special requirement",

        how:
            "A pivot is selected, values are compared against it, and the array is partitioned into smaller sections. The process is then repeated recursively."

    },


    binary: {

        name: "Binary Search",

        description:
            "Binary Search repeatedly divides a sorted search range in half to locate a target value.",

        approach:
            "Divide and Conquer",

        best:
            "O(1)",

        average:
            "O(log n)",

        worst:
            "O(log n)",

        space:
            "O(1)",

        requirement:
            "Sorted data",

        how:
            "The middle element is checked against the target. Depending on the comparison, half of the remaining search range is discarded and the process continues."

    }

};


/* =========================================================
   4. EVENT LISTENERS
========================================================= */

algorithmSelect.addEventListener(
    "change",
    handleAlgorithmChange
);

arraySize.addEventListener(
    "input",
    handleArraySizeChange
);

speedControl.addEventListener(
    "change",
    handleSpeedChange
);

generateBtn.addEventListener(
    "click",
    generateRandomArray
);

applyArrayBtn.addEventListener(
    "click",
    applyCustomArray
);

startBtn.addEventListener(
    "click",
    startVisualization
);

pauseBtn.addEventListener(
    "click",
    togglePause
);

resetBtn.addEventListener(
    "click",
    resetVisualizer
);


/* =========================================================
   5. INITIALIZE APPLICATION
========================================================= */

initialize();


function initialize() {

    currentAlgorithm =
        algorithmSelect.value;

    animationSpeed =
        Number(speedControl.value);

    updateAlgorithmInformation();

    updateSearchVisibility();

    generateRandomArray();

}


/* =========================================================
   6. ALGORITHM CHANGE
========================================================= */

function handleAlgorithmChange() {

    if (isRunning) {
        return;
    }

    currentAlgorithm =
        algorithmSelect.value;

    updateAlgorithmInformation();

    updateSearchVisibility();

    resetStatistics();

    clearResult();

    setStatus(
        `Selected ${algorithmInformation[currentAlgorithm].name}.`,
        "success"
    );

}


/* =========================================================
   7. ARRAY SIZE CHANGE
========================================================= */

function handleArraySizeChange() {

    const size =
        Number(arraySize.value);

    arraySizeValue.textContent =
        size;

    if (!isRunning) {

        generateRandomArray();

    }

}


/* =========================================================
   8. SPEED CHANGE
========================================================= */

function handleSpeedChange() {

    animationSpeed =
        Number(speedControl.value);

}


/* =========================================================
   9. UPDATE ALGORITHM INFORMATION
========================================================= */

function updateAlgorithmInformation() {

    const info =
        algorithmInformation[currentAlgorithm];

    visualizationTitle.textContent =
        info.name;

    algorithmInfoTitle.textContent =
        info.name;

    algorithmInfoDescription.textContent =
        info.description;

    algorithmApproach.textContent =
        info.approach;

    bestCase.textContent =
        info.best;

    averageCase.textContent =
        info.average;

    worstCase.textContent =
        info.worst;

    spaceComplexity.textContent =
        info.space;

    algorithmRequirement.textContent =
        info.requirement;

    howItWorksText.textContent =
        info.how;

}


/* =========================================================
   10. BINARY SEARCH VISIBILITY
========================================================= */

function updateSearchVisibility() {

    if (currentAlgorithm === "binary") {

        searchTargetGroup.classList.remove(
            "disabled"
        );

        searchTarget.disabled = false;

    } else {

        searchTargetGroup.classList.add(
            "disabled"
        );

        searchTarget.disabled = true;

    }

}


/* =========================================================
   11. GENERATE RANDOM ARRAY
========================================================= */

function generateRandomArray() {

    if (isRunning) {
        return;
    }

    const size =
        Number(arraySize.value);

    array = [];

    for (let i = 0; i < size; i++) {

        const value =
            Math.floor(
                Math.random() * 91
            ) + 10;

        array.push(value);

    }

    customArray.value = "";

    renderArray();

    resetStatistics();

    clearResult();

    updateArraySize();

    setAlgorithmState(
        "Ready",
        "ready"
    );

    operationTitle.textContent =
        "Waiting to start";

    operationDescription.textContent =
        "Select an algorithm and start the visualization to see its decisions step by step.";

    setStatus(
        "New random array generated. Ready to visualize.",
        "success"
    );

}


/* =========================================================
   12. APPLY CUSTOM ARRAY
========================================================= */

function applyCustomArray() {

    if (isRunning) {
        return;
    }

    const input =
        customArray.value.trim();

    if (!input) {

        setStatus(
            "Please enter numbers separated by commas.",
            "error"
        );

        return;
    }

    const values =
        input
            .split(",")
            .map(value => value.trim())
            .filter(value => value !== "")
            .map(Number);

    if (
        values.length === 0 ||
        values.some(value => !Number.isFinite(value))
    ) {

        setStatus(
            "Invalid array. Please enter valid numbers separated by commas.",
            "error"
        );

        return;
    }

    if (values.length > 50) {

        setStatus(
            "Please keep the custom array at 50 elements or fewer.",
            "error"
        );

        return;
    }

    if (values.length < 2) {

        setStatus(
            "Please enter at least 2 numbers.",
            "error"
        );

        return;
    }

    array =
        values.map(value =>
            Math.trunc(value)
        );

    arraySize.value =
        Math.min(
            Math.max(array.length, 5),
            50
        );

    arraySizeValue.textContent =
        array.length;

    renderArray();

    resetStatistics();

    clearResult();

    updateArraySize();

    setAlgorithmState(
        "Ready",
        "ready"
    );

    setStatus(
        `Custom array applied with ${array.length} elements.`,
        "success"
    );

}


/* =========================================================
   13. START VISUALIZATION
========================================================= */

async function startVisualization() {

    if (isRunning) {
        return;
    }

    if (array.length === 0) {

        setStatus(
            "Please generate or enter an array first.",
            "error"
        );

        return;
    }

    currentAlgorithm =
        algorithmSelect.value;

    animationSpeed =
        Number(speedControl.value);

    clearResult();

    resetStatistics();

    currentRunId++;

    const runId =
        currentRunId;

    isRunning = true;

    isPaused = false;

    currentStepIndex = 0;

    currentComparisons = 0;

    currentStepsCount = 0;

    startBtn.disabled = true;

    generateBtn.disabled = true;

    applyArrayBtn.disabled = true;

    algorithmSelect.disabled = true;

    arraySize.disabled = true;

    speedControl.disabled = true;

    pauseBtn.disabled = false;

    pauseBtn.textContent =
        "⏸ Pause";

    setAlgorithmState(
        "Running",
        "running"
    );


    try {

        if (currentAlgorithm === "merge") {

            await runMergeSort(runId);

        }

        else if (currentAlgorithm === "quick") {

            await runQuickSort(runId);

        }

        else if (currentAlgorithm === "binary") {

            await runBinarySearch(runId);

        }

    }

    catch (error) {

        console.error(error);

        setStatus(
            "Something went wrong while running the visualization.",
            "error"
        );

    }

}


/* =========================================================
   14. MERGE SORT RUNNER
========================================================= */

async function runMergeSort(runId) {

    const workingArray =
        [...array];

    algorithmStartTime =
        performance.now();

    const result =
        createMergeSortSteps(
            workingArray
        );

    algorithmEndTime =
        performance.now();

    currentSteps =
        result.steps;

    currentStepIndex = 0;

    currentComparisons = 0;

    currentStepsCount = 0;

    setStatus(
        "Merge Sort is dividing and merging the array.",
        "success"
    );

    await playSteps(
        runId,
        result.steps
    );

    if (runId !== currentRunId) {
        return;
    }

    array =
        result.sortedArray;

    renderArray();

    markAllBarsSorted();

    finishVisualization(
        algorithmEndTime -
        algorithmStartTime,
        result.comparisons,
        result.sortedArray,
        `Merge Sort completed in ${result.comparisons} comparisons.`
    );

}


/* =========================================================
   15. MERGE SORT ALGORITHM
========================================================= */

function createMergeSortSteps(inputArray) {

    const arr =
        [...inputArray];

    const steps = [];

    let comparisons = 0;


    function mergeSort(left, right) {

        if (left >= right) {
            return;
        }

        const middle =
            Math.floor(
                (left + right) / 2
            );


        mergeSort(
            left,
            middle
        );


        mergeSort(
            middle + 1,
            right
        );


        merge(
            left,
            middle,
            right
        );

    }


    function merge(left, middle, right) {

        const leftPart =
            arr.slice(
                left,
                middle + 1
            );

        const rightPart =
            arr.slice(
                middle + 1,
                right + 1
            );

        let i = 0;
        let j = 0;
        let k = left;


        while (
            i < leftPart.length &&
            j < rightPart.length
        ) {

            comparisons++;

            steps.push(
                createStep(
                    "compare",
                    arr,
                    [left + i, middle + 1 + j],
                    [],
                    `Comparing ${leftPart[i]} and ${rightPart[j]}.`,
                    `Merge Sort is deciding which value should come next.`
                )
            );


            if (
                leftPart[i] <=
                rightPart[j]
            ) {

                arr[k] =
                    leftPart[i];

                steps.push(
                    createStep(
                        "overwrite",
                        arr,
                        [k],
                        [],
                        `Placed ${arr[k]} into position ${k}.`,
                        `The smaller value is copied into the merged section.`
                    )
                );

                i++;

            }

            else {

                arr[k] =
                    rightPart[j];

                steps.push(
                    createStep(
                        "overwrite",
                        arr,
                        [k],
                        [],
                        `Placed ${arr[k]} into position ${k}.`,
                        `The smaller value is copied into the merged section.`
                    )
                );

                j++;

            }

            k++;

        }


        while (
            i < leftPart.length
        ) {

            arr[k] =
                leftPart[i];

            steps.push(
                createStep(
                    "overwrite",
                    arr,
                    [k],
                    [],
                    `Placed ${arr[k]} into position ${k}.`,
                    `The remaining value is added to the merged section.`
                )
            );

            i++;
            k++;

        }


        while (
            j < rightPart.length
        ) {

            arr[k] =
                rightPart[j];

            steps.push(
                createStep(
                    "overwrite",
                    arr,
                    [k],
                    [],
                    `Placed ${arr[k]} into position ${k}.`,
                    `The remaining value is added to the merged section.`
                )
            );

            j++;
            k++;

        }


        steps.push(
            createStep(
                "range-sorted",
                arr,
                [],
                createRange(
                    left,
                    right
                ),
                `Merged positions ${left}–${right}.`,
                `This section is now sorted relative to its range.`
            )
        );

    }


    mergeSort(
        0,
        arr.length - 1
    );


    steps.push(
        createStep(
            "all-sorted",
            arr,
            [],
            createRange(
                0,
                arr.length - 1
            ),
            "Merge Sort finished.",
            "Every element is now in sorted order."
        )
    );


    return {
        steps,
        comparisons,
        sortedArray: arr
    };

}


/* =========================================================
   16. QUICK SORT RUNNER
========================================================= */

async function runQuickSort(runId) {

    const workingArray =
        [...array];

    algorithmStartTime =
        performance.now();

    const result =
        createQuickSortSteps(
            workingArray
        );

    algorithmEndTime =
        performance.now();

    currentSteps =
        result.steps;

    currentStepIndex = 0;

    currentComparisons = 0;

    currentStepsCount = 0;

    setStatus(
        "Quick Sort is selecting pivots and partitioning the array.",
        "success"
    );

    await playSteps(
        runId,
        result.steps
    );

    if (runId !== currentRunId) {
        return;
    }

    array =
        result.sortedArray;

    renderArray();

    markAllBarsSorted();

    finishVisualization(
        algorithmEndTime -
        algorithmStartTime,
        result.comparisons,
        result.sortedArray,
        `Quick Sort completed in ${result.comparisons} comparisons.`
    );

}


/* =========================================================
   17. QUICK SORT ALGORITHM
========================================================= */

function createQuickSortSteps(inputArray) {

    const arr =
        [...inputArray];

    const steps = [];

    let comparisons = 0;


    function quickSort(low, high) {

        if (low >= high) {

            if (
                low >= 0 &&
                low < arr.length
            ) {

                steps.push(
                    createStep(
                        "active",
                        arr,
                        [low],
                        [],
                        `Position ${low} contains a completed section.`,
                        "This section no longer needs partitioning."
                    )
                );

            }

            return;
        }


        const pivotIndex =
            partition(
                low,
                high
            );


        quickSort(
            low,
            pivotIndex - 1
        );


        quickSort(
            pivotIndex + 1,
            high
        );

    }


    function partition(low, high) {

        const pivot =
            arr[high];

        let i =
            low;


        steps.push(
            createStep(
                "pivot",
                arr,
                [high],
                [],
                `Pivot selected: ${pivot}.`,
                `Quick Sort will compare values in this range against the pivot.`
            )
        );


        for (
            let j = low;
            j < high;
            j++
        ) {

            comparisons++;


            steps.push(
                createStep(
                    "compare",
                    arr,
                    [j, high],
                    [],
                    `Comparing ${arr[j]} with pivot ${pivot}.`,
                    arr[j] <= pivot
                        ? `${arr[j]} belongs on the left side of the pivot.`
                        : `${arr[j]} belongs on the right side of the pivot.`
                )
            );


            if (
                arr[j] <= pivot
            ) {

                if (i !== j) {

                    const temp =
                        arr[i];

                    arr[i] =
                        arr[j];

                    arr[j] =
                        temp;


                    steps.push(
                        createStep(
                            "swap",
                            arr,
                            [i, j],
                            [],
                            `Swapped ${arr[i]} and ${arr[j]}.`,
                            `The smaller value is moved toward the left side of the pivot.`
                        )
                    );

                }

                i++;

            }

        }


        if (i !== high) {

            const temp =
                arr[i];

            arr[i] =
                arr[high];

            arr[high] =
                temp;


            steps.push(
                createStep(
                    "pivot-place",
                    arr,
                    [i, high],
                    [],
                    `Placed pivot ${arr[i]} at position ${i}.`,
                    "The pivot is now in its final sorted position."
                )
            );

        }


        steps.push(
            createStep(
                "pivot-fixed",
                arr,
                [i],
                [],
                `Pivot ${arr[i]} is fixed.`,
                "Elements to the left are smaller or equal and elements to the right are larger."
            )
        );


        return i;

    }


    quickSort(
        0,
        arr.length - 1
    );


    steps.push(
        createStep(
            "all-sorted",
            arr,
            [],
            createRange(
                0,
                arr.length - 1
            ),
            "Quick Sort finished.",
            "Every element is now in sorted order."
        )
    );


    return {
        steps,
        comparisons,
        sortedArray: arr
    };

}


/* =========================================================
   18. BINARY SEARCH RUNNER
========================================================= */

async function runBinarySearch(runId) {

    let workingArray =
        [...array];


    /*
       Binary Search requires sorted data.

       We automatically sort the array if necessary,
       while clearly informing the user.
    */

    const wasAlreadySorted =
        isSorted(workingArray);


    if (!wasAlreadySorted) {

        workingArray.sort(
            (a, b) => a - b
        );

        array =
            [...workingArray];

        renderArray();

        setStatus(
            "Binary Search requires sorted data. The array was sorted automatically.",
            "warning"
        );

        await delay(
            700
        );

    }


    const target =
        Number(
            searchTarget.value
        );


    if (!Number.isFinite(target)) {

        finishWithoutRun(
            "Please enter a valid target value for Binary Search."
        );

        return;
    }


    algorithmStartTime =
        performance.now();


    const result =
        createBinarySearchSteps(
            workingArray,
            target
        );


    algorithmEndTime =
        performance.now();


    currentSteps =
        result.steps;

    currentStepIndex = 0;

    currentComparisons = 0;

    currentStepsCount = 0;


    setStatus(
        `Binary Search is looking for ${target}.`,
        "success"
    );


    await playSteps(
        runId,
        result.steps
    );


    if (runId !== currentRunId) {
        return;
    }


    array =
        workingArray;


    renderArray();


    if (result.foundIndex !== -1) {

        markBar(
            result.foundIndex,
            "found"
        );

    }


    finishVisualization(
        algorithmEndTime -
        algorithmStartTime,
        result.comparisons,
        result.foundIndex !== -1
            ? `Target ${target} found at index ${result.foundIndex}.`
            : `Target ${target} was not found.`,
        result.foundIndex !== -1
            ? `Binary Search found ${target} at index ${result.foundIndex}.`
            : `Binary Search checked the required ranges but did not find ${target}.`,
        {
            isSearch: true,
            found: result.foundIndex !== -1,
            target,
            index: result.foundIndex
        }
    );

}


/* =========================================================
   19. BINARY SEARCH ALGORITHM
========================================================= */

function createBinarySearchSteps(
    sortedArray,
    target
) {

    const steps = [];

    let low = 0;

    let high =
        sortedArray.length - 1;

    let comparisons = 0;

    let foundIndex = -1;


    while (
        low <= high
    ) {

        const mid =
            Math.floor(
                (low + high) / 2
            );


        comparisons++;


        const activeRange =
            createRange(
                low,
                high
            );


        steps.push(
            createStep(
                "binary-compare",
                sortedArray,
                [mid],
                activeRange,
                `Checking middle value ${sortedArray[mid]}.`,
                `Low = ${low}, Mid = ${mid}, High = ${high}.`
            )
        );


        if (
            sortedArray[mid] === target
        ) {

            foundIndex =
                mid;


            steps.push(
                createStep(
                    "found",
                    sortedArray,
                    [mid],
                    [mid],
                    `Target ${target} found.`,
                    `The middle value matches the target after ${comparisons} comparison${comparisons === 1 ? "" : "s"}.`
                )
            );


            break;

        }


        if (
            sortedArray[mid] < target
        ) {

            steps.push(
                createStep(
                    "discard-left",
                    sortedArray,
                    [],
                    createRange(
                        low,
                        mid - 1
                    ),
                    `${sortedArray[mid]} is smaller than ${target}.`,
                    "The left half including the middle element can be discarded."
                )
            );


            low =
                mid + 1;

        }

        else {

            steps.push(
                createStep(
                    "discard-right",
                    sortedArray,
                    [],
                    createRange(
                        mid + 1,
                        high
                    ),
                    `${sortedArray[mid]} is greater than ${target}.`,
                    "The right half including the middle element can be discarded."
                )
            );


            high =
                mid - 1;

        }

    }


    if (foundIndex === -1) {

        steps.push(
            createStep(
                "not-found",
                sortedArray,
                [],
                [],
                `Target ${target} was not found.`,
                "The search range became empty."
            )
        );

    }


    return {
        steps,
        comparisons,
        foundIndex
    };

}


/* =========================================================
   20. CREATE STEP
========================================================= */

function createStep(
    type,
    currentArray,
    highlights = [],
    secondary = [],
    title = "",
    description = ""
) {

    return {

        type,

        array:
            [...currentArray],

        highlights:
            [...highlights],

        secondary:
            [...secondary],

        title,

        description,

        comparison:
            type === "compare" ||
            type === "binary-compare",

        timestamp:
            performance.now()

    };

}


/* =========================================================
   21. CREATE RANGE
========================================================= */

function createRange(
    start,
    end
) {

    const range = [];

    if (end < start) {
        return range;
    }

    for (
        let i = start;
        i <= end;
        i++
    ) {

        range.push(i);

    }

    return range;

}


/* =========================================================
   22. PLAY VISUALIZATION STEPS
========================================================= */

async function playSteps(
    runId,
    steps
) {

    for (
        let i = 0;
        i < steps.length;
        i++
    ) {

        if (
            runId !== currentRunId
        ) {
            return;
        }


        await waitIfPaused(
            runId
        );


        if (
            runId !== currentRunId
        ) {
            return;
        }


        const step =
            steps[i];


        currentStepIndex =
            i;


        currentStepsCount =
            i + 1;


        if (step.comparison) {

            currentComparisons++;

        }


        updateStatistics();


        renderStep(
            step
        );


        await delay(
            animationSpeed
        );

    }

}


/* =========================================================
   23. RENDER STEP
========================================================= */

function renderStep(step) {

    array =
        [...step.array];

    renderArray(
        step.highlights,
        step.secondary,
        step.type
    );


    operationTitle.textContent =
        step.title;


    operationDescription.textContent =
        step.description;


    updateOperationIcon(
        step.type
    );


    if (
        step.type === "found"
    ) {

        setAlgorithmState(
            "Found",
            "completed"
        );

    }

    else if (
        step.type === "not-found"
    ) {

        setAlgorithmState(
            "Not Found",
            "completed"
        );

    }

}


/* =========================================================
   24. RENDER ARRAY
========================================================= */

function renderArray(
    primaryHighlights = [],
    secondaryHighlights = [],
    stepType = "normal"
) {

    if (
        !array ||
        array.length === 0
    ) {

        arrayVisualization.innerHTML = `
            <div class="empty-visualization">
                <div class="empty-icon">📊</div>
                <p>Your array visualization will appear here.</p>
                <small>Generate an array or enter your own values.</small>
            </div>
        `;

        return;
    }


    arrayVisualization.innerHTML = "";


    const maxValue =
        Math.max(
            ...array.map(
                value => Math.abs(value)
            ),
            1
        );


    array.forEach(
        (value, index) => {

            const container =
                document.createElement("div");

            container.className =
                "array-bar-container";


            const bar =
                document.createElement("div");

            bar.className =
                "array-bar normal";


            /*
               Height is based on absolute value.
               This keeps the visualizer usable even
               if a custom array contains negative numbers.
            */

            const normalizedHeight =
                Math.max(
                    5,
                    (
                        Math.abs(value) /
                        maxValue
                    ) * 260
                );


            bar.style.height =
                `${normalizedHeight}px`;


            const valueLabel =
                document.createElement("span");

            valueLabel.className =
                "array-bar-value";

            valueLabel.textContent =
                value;


            /*
               Apply visualization states.
            */

            if (
                primaryHighlights.includes(index)
            ) {

                if (
                    stepType === "found"
                ) {

                    bar.classList.add(
                        "found"
                    );

                }

                else if (
                    stepType === "sorted" ||
                    stepType === "all-sorted"
                ) {

                    bar.classList.add(
                        "sorted"
                    );

                }

                else {

                    bar.classList.add(
                        "comparing"
                    );

                }

            }


            if (
                secondaryHighlights.includes(index)
            ) {

                if (
                    stepType === "discard-left" ||
                    stepType === "discard-right"
                ) {

                    bar.classList.add(
                        "discarded"
                    );

                }

                else {

                    bar.classList.add(
                        "active"
                    );

                }

            }


            if (
                stepType === "discard-left" ||
                stepType === "discard-right"
            ) {

                const activeSet =
                    new Set(
                        secondaryHighlights
                    );

                if (
                    !activeSet.has(index) &&
                    !primaryHighlights.includes(index)
                ) {

                    bar.classList.add(
                        "discarded"
                    );

                }

            }


            if (
                stepType === "all-sorted"
            ) {

                bar.classList.remove(
                    "normal"
                );

                bar.classList.add(
                    "sorted"
                );

            }


            container.appendChild(
                bar
            );

            container.appendChild(
                valueLabel
            );

            arrayVisualization.appendChild(
                container
            );

        }
    );

}


/* =========================================================
   25. UPDATE OPERATION ICON
========================================================= */

function updateOperationIcon(
    type
) {

    const icon =
        document.querySelector(
            ".operation-icon"
        );


    if (!icon) {
        return;
    }


    const icons = {

        compare: "⚖️",

        overwrite: "↳",

        "range-sorted": "✅",

        "all-sorted": "🎉",

        pivot: "📍",

        swap: "🔄",

        "pivot-place": "📌",

        "pivot-fixed": "🔒",

        active: "🔎",

        "binary-compare": "🎯",

        "discard-left": "⬅️",

        "discard-right": "➡️",

        found: "✅",

        "not-found": "❌",

        normal: "🧠"

    };


    icon.textContent =
        icons[type] || "🧠";

}


/* =========================================================
   26. UPDATE STATISTICS
========================================================= */

function updateStatistics() {

    stepsCount.textContent =
        currentStepsCount;

    comparisonsCount.textContent =
        currentComparisons;

    currentArraySize.textContent =
        array.length;

}


/* =========================================================
   27. UPDATE ARRAY SIZE
========================================================= */

function updateArraySize() {

    currentArraySize.textContent =
        array.length;

}


/* =========================================================
   28. RESET STATISTICS
========================================================= */

function resetStatistics() {

    currentComparisons = 0;

    currentStepsCount = 0;

    algorithmStartTime = 0;

    algorithmEndTime = 0;

    stepsCount.textContent = "0";

    comparisonsCount.textContent = "0";

    executionTime.textContent = "0 ms";

    currentArraySize.textContent =
        array.length;

}


/* =========================================================
   29. FINISH VISUALIZATION
========================================================= */

function finishVisualization(
    time,
    comparisons,
    result,
    statusText,
    customOperationText = null,
    extraData = null
) {

    isRunning = false;

    isPaused = false;

    currentComparisons =
        comparisons;

    comparisonsCount.textContent =
        comparisons;


    const formattedTime =
        formatTime(time);


    executionTime.textContent =
        formattedTime;


    setAlgorithmState(
        "Completed",
        "completed"
    );


    startBtn.disabled = false;

    generateBtn.disabled = false;

    applyArrayBtn.disabled = false;

    algorithmSelect.disabled = false;

    arraySize.disabled = false;

    speedControl.disabled = false;

    pauseBtn.disabled = true;

    pauseBtn.textContent =
        "⏸ Pause";


    setStatus(
        statusText,
        "success"
    );


    if (
        extraData &&
        extraData.isSearch
    ) {

        showSearchResult(
            extraData
        );

    }

    else {

        showSortingResult(
            result
        );

    }


    if (customOperationText) {

        operationTitle.textContent =
            extraData &&
            extraData.isSearch &&
            extraData.found
                ? "Target Found"
                : extraData &&
                  extraData.isSearch
                    ? "Target Not Found"
                    : "Sorting Completed";


        operationDescription.textContent =
            customOperationText;

    }


    currentStepsCount =
        Math.max(
            currentStepsCount,
            currentSteps.length
        );


    stepsCount.textContent =
        currentStepsCount;

}


/* =========================================================
   30. FINISH WITHOUT RUNNING
========================================================= */

function finishWithoutRun(
    message
) {

    isRunning = false;

    isPaused = false;

    startBtn.disabled = false;

    generateBtn.disabled = false;

    applyArrayBtn.disabled = false;

    algorithmSelect.disabled = false;

    arraySize.disabled = false;

    speedControl.disabled = false;

    pauseBtn.disabled = true;

    setAlgorithmState(
        "Ready",
        "ready"
    );

    setStatus(
        message,
        "error"
    );

}


/* =========================================================
   31. SHOW SORTING RESULT
========================================================= */

function showSortingResult(
    sortedArray
) {

    const formattedArray =
        sortedArray.join(", ");


    resultContent.innerHTML = `
        <div class="result-success">

            <div class="result-icon">
                ✅
            </div>

            <div style="width: 100%;">

                <strong>
                    Array Sorted Successfully
                </strong>

                <p>
                    The algorithm completed and produced the following sorted array:
                </p>

                <div class="result-array">
                    [ ${escapeHTML(formattedArray)} ]
                </div>

            </div>

        </div>
    `;

}


/* =========================================================
   32. SHOW BINARY SEARCH RESULT
========================================================= */

function showSearchResult(
    data
) {

    if (data.found) {

        resultContent.innerHTML = `
            <div class="result-success">

                <div class="result-icon">
                    🎯
                </div>

                <div>

                    <strong>
                        Target Found
                    </strong>

                    <p>
                        ${escapeHTML(
                            String(data.target)
                        )}
                        was found at index
                        ${data.index}.
                    </p>

                </div>

            </div>
        `;

    }

    else {

        resultContent.innerHTML = `
            <div class="result-search">

                <div class="result-icon">
                    🔍
                </div>

                <div>

                    <strong>
                        Target Not Found
                    </strong>

                    <p>
                        ${escapeHTML(
                            String(data.target)
                        )}
                        is not present in the sorted array.
                    </p>

                </div>

            </div>
        `;

    }

}


/* =========================================================
   33. CLEAR RESULT
========================================================= */

function clearResult() {

    resultContent.innerHTML = `
        <div class="result-placeholder">

            <div class="result-icon">
                🎯
            </div>

            <div>

                <strong>
                    No result yet
                </strong>

                <p>
                    Run an algorithm to see the final result.
                </p>

            </div>

        </div>
    `;

}


/* =========================================================
   34. MARK ALL BARS SORTED
========================================================= */

function markAllBarsSorted() {

    const bars =
        document.querySelectorAll(
            ".array-bar"
        );


    bars.forEach(
        bar => {

            bar.classList.remove(
                "normal",
                "comparing",
                "active",
                "discarded"
            );

            bar.classList.add(
                "sorted"
            );

        }
    );

}


/* =========================================================
   35. MARK INDIVIDUAL BAR
========================================================= */

function markBar(
    index,
    className
) {

    const bars =
        document.querySelectorAll(
            ".array-bar"
        );


    if (
        bars[index]
    ) {

        bars[index].classList.add(
            className
        );

    }

}


/* =========================================================
   36. SET ALGORITHM STATE
========================================================= */

function setAlgorithmState(
    text,
    stateClass
) {

    algorithmState.textContent =
        text;


    algorithmState.className =
        `state-badge ${stateClass}`;

}


/* =========================================================
   37. STATUS MESSAGE
========================================================= */

function setStatus(
    message,
    type = ""
) {

    statusMessage.textContent =
        message;


    statusMessage.className =
        "status-message";


    if (type) {

        statusMessage.classList.add(
            type
        );

    }

}


/* =========================================================
   38. PAUSE / RESUME
========================================================= */

function togglePause() {

    if (!isRunning) {
        return;
    }


    isPaused =
        !isPaused;


    if (isPaused) {

        pauseBtn.textContent =
            "▶ Resume";

        setAlgorithmState(
            "Paused",
            "paused"
        );

        setStatus(
            "Visualization paused. Press Resume to continue.",
            "warning"
        );

    }

    else {

        pauseBtn.textContent =
            "⏸ Pause";

        setAlgorithmState(
            "Running",
            "running"
        );

        setStatus(
            "Visualization resumed.",
            "success"
        );

    }

}


/* =========================================================
   39. WAIT WHILE PAUSED
========================================================= */

async function waitIfPaused(
    runId
) {

    while (
        isPaused &&
        runId === currentRunId
    ) {

        await delay(
            100
        );

    }

}


/* =========================================================
   40. RESET VISUALIZER
========================================================= */

function resetVisualizer() {

    currentRunId++;

    isRunning = false;

    isPaused = false;

    currentSteps = [];

    currentStepIndex = 0;

    currentComparisons = 0;

    currentStepsCount = 0;


    startBtn.disabled = false;

    generateBtn.disabled = false;

    applyArrayBtn.disabled = false;

    algorithmSelect.disabled = false;

    arraySize.disabled = false;

    speedControl.disabled = false;

    pauseBtn.disabled = true;

    pauseBtn.textContent =
        "⏸ Pause";


    resetStatistics();

    clearResult();


    setAlgorithmState(
        "Ready",
        "ready"
    );


    operationTitle.textContent =
        "Waiting to start";


    operationDescription.textContent =
        "Select an algorithm and start the visualization to see its decisions step by step.";


    updateOperationIcon(
        "normal"
    );


    updateAlgorithmInformation();

    updateSearchVisibility();


    if (array.length > 0) {

        renderArray();

    }


    setStatus(
        "Visualizer reset. Ready for a new run.",
        "success"
    );

}


/* =========================================================
   41. DELAY
========================================================= */

function delay(
    milliseconds
) {

    return new Promise(
        resolve =>
            setTimeout(
                resolve,
                milliseconds
            )
    );

}


/* =========================================================
   42. FORMAT EXECUTION TIME
========================================================= */

function formatTime(
    milliseconds
) {

    if (
        milliseconds < 0.01
    ) {

        return "< 0.01 ms";

    }


    if (
        milliseconds < 1
    ) {

        return `${milliseconds.toFixed(3)} ms`;

    }


    return `${milliseconds.toFixed(2)} ms`;

}


/* =========================================================
   43. CHECK IF SORTED
========================================================= */

function isSorted(
    values
) {

    for (
        let i = 1;
        i < values.length;
        i++
    ) {

        if (
            values[i] <
            values[i - 1]
        ) {

            return false;

        }

    }

    return true;

}


/* =========================================================
   44. ESCAPE HTML
========================================================= */

function escapeHTML(
    value
) {

    return String(value)
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


/* =========================================================
   END OF SCRIPT.JS
========================================================= */