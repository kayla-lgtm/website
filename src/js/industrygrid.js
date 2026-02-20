(function () {
    var stage = document.getElementById("industriesStage");
    var grid = document.getElementById("industriesGrid");
    var overlay = document.getElementById("industriesOverlay");
    var overlayImage = document.getElementById("industriesOverlayImage");
    var overlayTitle = document.getElementById("industriesOverlayTitle");
    var overlayList = document.getElementById("industriesOverlayList");
    var backButton = document.getElementById("industriesBack");

    if (!stage || !grid || !overlay || !overlayImage || !overlayTitle || !overlayList || !backButton) {
        return;
    }

    var industries = [
        {
            title: "Finance",
            image: "../images/GridPhotos/GridFinance.jpg",
            alt: "Finance industry",
            useCases: [
                { label: "Fraud Detection", body: "Detect suspicious transactions in real time with explainable risk scoring and escalation workflows." },
                { label: "Credit Intelligence", body: "Combine internal and external signals to improve underwriting consistency and cycle time." },
                { label: "Compliance Monitoring", body: "Track policy exceptions, generate evidence trails, and keep audits ready by default." },
                { label: "Treasury Visibility", body: "Unify cash and exposure views across systems for faster capital allocation decisions." },
                { label: "Client 360 Insights", body: "Surface account-level recommendations for cross-sell, retention, and relationship health." }
            ]
        },
        {
            title: "Manufacturing",
            image: "../images/GridPhotos/GridManufacturing.jpg",
            alt: "Manufacturing industry",
            useCases: [
                { label: "Predictive Maintenance", body: "Flag equipment anomalies before failure by learning machine behavior across shifts." },
                { label: "Yield Optimization", body: "Model root causes for scrap and downtime to improve first-pass quality." },
                { label: "Quality Traceability", body: "Link defects to lots, suppliers, and lines with transparent lineage." },
                { label: "Capacity Planning", body: "Forecast constraints and rebalance production plans using live plant telemetry." },
                { label: "Safety Operations", body: "Identify high-risk patterns and prioritize interventions across facilities." }
            ]
        },
        {
            title: "Warehousing",
            image: "../images/GridPhotos/GridWarehousing.jpeg",
            alt: "Warehousing industry",
            useCases: [
                { label: "Slotting Optimization", body: "Continuously rebalance pick paths and product placement based on demand shifts." },
                { label: "Labor Planning", body: "Predict staffing needs by zone to reduce overtime and missed service levels." },
                { label: "Inventory Accuracy", body: "Detect discrepancies early with event-level reconciliation and exception alerts." },
                { label: "Dock Throughput", body: "Coordinate inbound and outbound schedules to reduce bottlenecks at peak times." },
                { label: "Fulfillment Prioritization", body: "Route urgent orders intelligently to protect SLA performance." }
            ]
        },
        {
            title: "Transportation & Logistics",
            image: "../images/GridPhotos/GridTransportation.jpg",
            alt: "Transportation industry",
            useCases: [
                { label: "Route Risk Scoring", body: "Blend weather, congestion, and historical delay data to optimize dispatch." },
                { label: "Fleet Health Monitoring", body: "Track asset condition continuously and reduce unplanned downtime." },
                { label: "ETA Reliability", body: "Improve arrival predictions with live context and automated replanning." },
                { label: "Claims Reduction", body: "Identify incident patterns and operational drivers behind cargo damage." },
                { label: "Carrier Performance", body: "Benchmark partners by lane, cost, reliability, and service quality." }
            ]
        },
        {
            title: "State Government",
            image: "../images/GridPhotos/GridStateGovernment.jpg",
            alt: "State government industry",
            useCases: [
                { label: "Citizen Service Triage", body: "Route public requests to the right agency teams with faster response-time prioritization." },
                { label: "Benefits Integrity", body: "Detect duplicate claims and anomaly patterns while preserving transparent eligibility workflows." },
                { label: "Grant Program Oversight", body: "Track funding outcomes, compliance milestones, and spend visibility across departments." },
                { label: "Emergency Response Intel", body: "Unify live agency signals to support coordinated incident decisions and resource deployment." },
                { label: "Policy Impact Reporting", body: "Generate evidence-backed summaries of program performance for leadership and public accountability." }
            ]
        },
        {
            title: "Real Estate",
            image: "../images/GridPhotos/GridRealEstate.jpg",
            alt: "Real estate industry",
            useCases: [
                { label: "Asset Performance", body: "Track NOI drivers and benchmark property performance across regions." },
                { label: "Occupancy Forecasting", body: "Project vacancy and renewal risk using tenant and market behavior signals." },
                { label: "Lease Intelligence", body: "Extract obligations and critical dates from contracts for proactive management." },
                { label: "Maintenance Prioritization", body: "Rank work orders by risk, tenant impact, and operating cost." },
                { label: "Acquisition Screening", body: "Evaluate opportunities quickly with unified financial and location intelligence." }
            ]
        }
    ];

    /* ── Build the 3×2 tile grid ── */
    for (var i = 0; i < industries.length; i += 1) {
        (function (index) {
            var ind = industries[index];

            var tile = document.createElement("button");
            tile.className = "industries-tile";
            tile.type = "button";

            var img = document.createElement("img");
            img.className = "industries-tile-image";
            img.src = ind.image;
            img.alt = ind.alt;

            var label = document.createElement("span");
            label.className = "industries-tile-label";
            label.textContent = ind.title;

            tile.appendChild(img);
            tile.appendChild(label);
            grid.appendChild(tile);

            tile.addEventListener("click", function () {
                openOverlay(index);
            });
        })(i);
    }

    /* ── Open overlay for a given industry ── */
    function openOverlay(index) {
        var ind = industries[index];

        overlayImage.src = ind.image;
        overlayImage.alt = ind.alt;
        overlayTitle.textContent = ind.title;

        overlayList.innerHTML = "";
        for (var j = 0; j < ind.useCases.length; j += 1) {
            var li = document.createElement("li");
            li.className = "industries-overlay-item";

            var lbl = document.createElement("span");
            lbl.className = "industries-overlay-label";
            lbl.textContent = ind.useCases[j].label;

            var desc = document.createElement("span");
            desc.className = "industries-overlay-desc";
            desc.textContent = ind.useCases[j].body;

            li.appendChild(lbl);
            li.appendChild(desc);
            overlayList.appendChild(li);
        }

        stage.classList.add("is-open");
    }

    /* ── Close overlay ── */
    function closeOverlay() {
        stage.classList.remove("is-open");
    }

    backButton.addEventListener("click", closeOverlay);

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && stage.classList.contains("is-open")) {
            closeOverlay();
        }
    });
})();
