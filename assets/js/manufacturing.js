// Renders the manufacturing process timeline and equipment table.
(() => {
    const steps = [
        ["clipboard-check", "Plan", "Requirement analysis", "Review your drawing, sample and where the part will be used."],
        ["flask", "Plan", "Material selection", "Choose from NBR, EPDM, HNBR, silicone, neoprene, natural rubber and more."],
        ["blender", "Make", "Compound preparation", "Mix the compound to specification on our two-roll mixing mill."],
        ["screwdriver-wrench", "Make", "Tooling and mould setup", "Prepare the mould and keep it clean in our tool maintenance area."],
        ["industry", "Make", "Moulding", "Compression moulding on hydraulic presses from 14″ to 25″ platens."],
        ["fire", "Make", "Curing", "Cure each batch for the time and temperature its compound needs."],
        ["scissors", "Make", "Trimming and finishing", "Remove flash and clean up the edges of every part."],
        ["ruler-combined", "Check", "Dimensional inspection", "Measure with vernier, micrometer, ring gauges and optical comparator."],
        ["microscope", "Check", "Lab testing", "Check hardness, tensile strength, ageing and cure behaviour in-house."],
        ["circle-check", "Check", "Final approval", "Review the finished lot against your requirements before release."],
        ["box", "Deliver", "Packing", "Pack approved parts so they arrive clean and undamaged."],
        ["truck-fast", "Deliver", "Dispatch", "Ship on schedule from our plant in Faridabad, Haryana."]
    ];

    // Keep each process stage in display order: icon, stage, title, and description.
    document.getElementById("mfSteps").innerHTML = steps
        .map(([icon, stage, title, description], index) => `
            <li class="mf-step">
                <i class="fa-solid fa-${icon}" aria-hidden="true"></i>
                <div>
                    <small>${stage}<b>${String(index + 1).padStart(2, "0")}</b></small>
                    <h3>${title}</h3>
                    <p>${description}</p>
                </div>
            </li>
        `)
        .join("");

    // Equipment details are kept as data so the table stays consistent and easy to update.
    const hydraulicMouldingMachine = "Hydraulic Moulding Machine";
    const hydraulicPress = "Hydraulic press";
    const machines = [
        ["MM-01", "Mixing Mill", "Two roll mill", "Bajaj Hydraulic", "16″ × 18″", "2500 kg", "1"],
        ["HM-01", hydraulicMouldingMachine, hydraulicPress, "Bajaj Hydraulic", "14″ × 14″", "1800 kg", "2"],
        ["CP-01", "Compressor", "Air compressor", "MEPS / Sutchar Enterprise", "3 HP", "120 kg", "1"],
        ["TCM-01", "Tool Cleaning Machine", "Parts cleaning", "Techno Enterprises", "2.5 mm orifice", "150 kg", "1"],
        ["HM-03", hydraulicMouldingMachine, hydraulicPress, "Bajaj Hydraulic", "16″ × 16″", "2200 kg", "1"],
        ["HM-04", hydraulicMouldingMachine, hydraulicPress, "Bajaj Hydraulic", "20″ × 20″", "3200 kg", "1"],
        ["HM-05", hydraulicMouldingMachine, hydraulicPress, "Bajaj Hydraulic", "25″ × 25″", "4200 kg", "1"],
        ["HM-06", hydraulicMouldingMachine, hydraulicPress, "Kgn Hydraulic", "16″ × 16″", "2000 kg", "1"],
        ["HM-07", hydraulicMouldingMachine, hydraulicPress, "Kgn Hydraulic", "16″ × 16″", "2000 kg", "1"],
        ["HM-08", hydraulicMouldingMachine, hydraulicPress, "Kgn Hydraulic", "16″ × 16″", "2000 kg", "1"]
    ];
    const columnLabels = ["Code", "Machine", "Type", "Make", "Size", "Weight", "Qty"];

    document.getElementById("mfRows").innerHTML = machines
        .map((machine) => `
            <tr>
                ${machine.map((value, index) => `
                    <td data-label="${columnLabels[index]}">${value}</td>
                `).join("")}
            </tr>
        `)
        .join("");
})();
