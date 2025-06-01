
import { Pattern, GarmentType, ConstructionType, SkillLevel, YarnWeight } from '../types';
import { PATTERN_PLACEHOLDER_IMAGE } from '../constants';

export const patternsData: Pattern[] = [
  {
    id: "aurora-ribbed-beanie",
    slug: "aurora-ribbed-beanie",
    title: "The Aurora Ribbed Beanie",
    subtitle: "A chic and cozy knit",
    imageUrl: PATTERN_PLACEHOLDER_IMAGE.replace('{seed}', 'aurora'),
    images: [
      { url: PATTERN_PLACEHOLDER_IMAGE.replace('{seed}', 'aurora1'), alt: "Aurora Beanie front view" },
      { url: PATTERN_PLACEHOLDER_IMAGE.replace('{seed}', 'aurora2'), alt: "Aurora Beanie side view" },
      { url: PATTERN_PLACEHOLDER_IMAGE.replace('{seed}', 'aurora3'), alt: "Aurora Beanie detail" },
    ],
    areumIntro: "This pattern came to life because I wanted a quick, satisfying knit that still felt luxurious. The 2x2 rib is classic, and the crown shaping gives it a lovely finish. What I particularly love about this design is its versatility – it looks great on everyone! It's a chance to explore knitting in the round and simple decreases with a beautiful result.",
    areumNote: "A beautifully simple ribbed beanie, perfect for showcasing your favorite worsted weight yarn.",
    garmentType: GarmentType.Hat,
    construction: ConstructionType.SeamlessTopDown, // Technically bottom-up for a beanie
    skillLevel: SkillLevel.AdventurousBeginner,
    skillTags: ["Knitting in the round", "Ribbing", "Decreases"],
    yarnWeight: YarnWeight.Worsted,
    mainYarn: "Designed for: Worsted Weight Merino",
    yarnDetails: {
      featuredYarn: "Malabrigo Worsted (100% Merino Wool)",
      thoughtsOnFiber: "I selected Malabrigo Worsted for its exceptional stitch definition, softness against the skin, and the beautiful kettle-dyed colors. The way it plumps up in ribbing truly makes the texture sing.",
      yardageForSample: "Approx. 160 yds for Size L",
      substitutions: "If substituting, look for a yarn with similar plied structure and good elasticity. Aim for a worsted weight yarn that achieves gauge. A soft wool or wool blend is recommended.",
    },
    designEngineeringNotes: "The crown decreases are spaced to create a smooth, even gather. The brim is designed to be either worn flat or folded for extra warmth. I opted for a classic 2x2 rib as it provides excellent stretch and a timeless look.",
    constructionAtAGlance: "Knit from the bottom up, seamlessly in the round. The brim is worked in 2x2 rib, followed by the body in stockinette stitch (though the example pattern shows all rib). Crown shaping is achieved with k2tog decreases. An optional pom-pom can be added.",
    specificSkillsRequired: ["Long-tail cast-on", "Knitting in the round", "Knit & Purl stitches", "2x2 Ribbing", "k2tog (knit 2 together)", "Working with DPNs or Magic Loop for crown"],
    materialsNeeded: {
      yarn: "Worsted weight yarn (approx. 120-180 yards depending on size)",
      needles: "US 7 (4.5mm) 16-inch circular (brim), US 8 (5.0mm) 16-inch circular and DPNs (body & crown)",
      notions: "Stitch marker, tapestry needle, scissors, optional pom-pom maker",
    },
    gaugeInfo: {
      details: "20 sts x 26 rnds = 4 inches (10 cm) in K2, P2 ribbing on US 8 (5.0mm) needles, worked in the round, measured unstretched after blocking.",
      swatchingNotes: "Achieving the correct gauge is crucial. Swatch in the round and block before measuring. If your gauge is too tight (more sts/inch), go up a needle size. If too loose (fewer sts/inch), go down a needle size.",
    },
    finishedMeasurements: {
      notes: "Shown in size L on a 22.5-inch head. Designed with 2-3 inches of negative ease.",
      sizes: {
        S: { "Fits Head": "19-20\"", "Finished Circum.": "~17\"", "Finished Height": "~8\"", "Yarn": "120 yds" },
        M: { "Fits Head": "21-22\"", "Finished Circum.": "~19\"", "Finished Height": "~8.5\"", "Yarn": "140 yds" },
        L: { "Fits Head": "23-24\"", "Finished Circum.": "~21\"", "Finished Height": "~9\"", "Yarn": "160 yds" },
        XL: { "Fits Head": "24-25\"", "Finished Circum.": "~22\"", "Finished Height": "~9.5\"", "Yarn": "180 yds" },
      }
    },
    patternContent: { // Simplified from example, focusing on structure
      overview: "The Aurora Ribbed Beanie is a cozy, stretchy hat designed with warmth and elegance in mind, featuring a snug 2x2 ribbed fabric and neatly shaped crown. Perfect for knitters comfortable with basic knitting in the round, this project utilizes ribbing and simple k2tog decreases. It's an excellent choice for a quick gift or a stylish addition to your own wardrobe.",
      skillLevelText: "Adventurous Beginner",
      estimatedTime: "4-7 hours (Size L)",
      sizesData: { // As per the example JS `SIZES_DATA.L`
        S: { name: "Small (S)", abbr: "S", approxTime: "3-5", yarnAmountYards: 120, yarnAmountMeters: 110, exampleCastOn: 90, castOnSts: 90, brimHeight: 2, brimHeightCm: 5, bodyLengthToDecreases: 6, bodyLengthToDecreasesCm: 15, stockinetteBodyLength: 4, stockinetteBodyLengthCm: 10, decRnd1Knit: 7, decRnd1Sts: 80, decRnd2Knit: 6, decRnd2Sts: 70, decRnd3Knit: 5, decRnd3Sts: 60, decRnd4Knit: 4, decRnd4Sts: 50, decRnd5Knit: 3, decRnd5Sts: 40, decRnd6Knit: 2, decRnd6Sts: 30, decRnd7Knit: 1, decRnd7Sts: 20, decRnd8Knit: 0, decRnd8Sts: 10, },
        M: { name: "Medium (M)", abbr: "M", approxTime: "4-6", yarnAmountYards: 140, yarnAmountMeters: 128, exampleCastOn: 100, castOnSts: 100, brimHeight: 2, brimHeightCm: 5, bodyLengthToDecreases: 6.5, bodyLengthToDecreasesCm: 16.5, stockinetteBodyLength: 4.5, stockinetteBodyLengthCm: 11.5, decRnd1Knit: 8, decRnd1Sts: 90, decRnd2Knit: 7, decRnd2Sts: 80, decRnd3Knit: 6, decRnd3Sts: 70, decRnd4Knit: 5, decRnd4Sts: 60, decRnd5Knit: 4, decRnd5Sts: 50, decRnd6Knit: 3, decRnd6Sts: 40, decRnd7Knit: 2, decRnd7Sts: 30, decRnd8Knit: 1, decRnd8Sts: 20, decRnd9Knit: 0, decRnd9Sts: 10, },
        L: { name: "Large (L)", abbr: "L", approxTime: "4-7", yarnAmountYards: 160, yarnAmountMeters: 146, exampleCastOn: 110, castOnSts: 110, brimHeight: 2, brimHeightCm: 5, bodyLengthToDecreases: 6.5, bodyLengthToDecreasesCm: 16.5, stockinetteBodyLength: 4.5, stockinetteBodyLengthCm: 11.5, decRnd1Knit: 9, decRnd1Sts: 100, decRnd2Knit: 8, decRnd2Sts: 90, decRnd3Knit: 7, decRnd3Sts: 80, decRnd4Knit: 6, decRnd4Sts: 70, decRnd5Knit: 5, decRnd5Sts: 60, decRnd6Knit: 4, decRnd6Sts: 50, decRnd7Knit: 3, decRnd7Sts: 40, decRnd8Knit: 2, decRnd8Sts: 30, decRnd9Knit: 1, decRnd9Sts: 20, decRnd10Knit: 0, decRnd10Sts: 10, },
        XL: { name: "Extra Large (XL)", abbr: "XL", approxTime: "5-8", yarnAmountYards: 180, yarnAmountMeters: 165, exampleCastOn: 120, castOnSts: 120, brimHeight: 2, brimHeightCm: 5, bodyLengthToDecreases: 7, bodyLengthToDecreasesCm: 18, stockinetteBodyLength: 5, stockinetteBodyLengthCm: 13, decRnd1Knit: 10, decRnd1Sts: 110, decRnd2Knit: 9, decRnd2Sts: 100, decRnd3Knit: 8, decRnd3Sts: 90, decRnd4Knit: 7, decRnd4Sts: 80, decRnd5Knit: 6, decRnd5Sts: 70, decRnd6Knit: 5, decRnd6Sts: 60, decRnd7Knit: 4, decRnd7Sts: 50, decRnd8Knit: 3, decRnd8Sts: 40, decRnd9Knit: 2, decRnd9Sts: 30, decRnd10Knit: 1, decRnd10Sts: 20, decRnd11Sts: 10, }
      },
      introNotes: {
        title: "Introduction & Notes",
        content: [
          "Welcome to the Aurora Beanie pattern. This design emphasizes clarity and an enjoyable making process. Please read through the entire pattern before beginning.",
          "<strong>Key Pattern Notes:</strong><ul><li>The hat is worked in the round from the bottom up.</li><li>Sized S (M, L, XL). Numbers are given as S (M, L, XL) e.g., (<strong><span class='size-dynamic' data-size-key='exampleCastOn'>110</span> sts</strong>). If only one number is provided, it applies to all sizes. The selected size's numbers will be bolded in the instructions.</li><li>Slip the BOR marker on every round.</li><li><strong>Gauge is critical.</strong> Adjust needle size if your gauge differs. More stitches per inch means you need larger needles; fewer stitches per inch means smaller needles.</li></ul>"
        ]
      },
      sizingInfo: {
        title: "Sizing Information",
        content: [
          "This beanie is designed in <strong>4 sizes: S (M, L, XL)</strong>. The sample shown is size L on a model with a <span class='unit-dynamic' data-base-value='22.5' data-unit-type='length'>22.5-inch</span> head.",
          "<strong>Fit Notes:</strong> This hat is designed with approximately <span class='unit-dynamic' data-base-value='2' data-unit-type='length_range_start'>2</span>-<span class='unit-dynamic' data-base-value='3' data-unit-type='length_range_end'>3 inches</span> (<span class='unit-dynamic' data-base-value='5' data-unit-type='length_range_start'>5</span>-<span class='unit-dynamic' data-base-value='7.5' data-unit-type='length_range_end'>7.5 cm</span>) of negative ease for a snug fit. The 2x2 ribbed fabric is very stretchy and will accommodate a range of head sizes within each listed size.",
          "Select your size based on the 'Fits Head Circumference' in the table below. If between sizes, consider sizing down for a very snug fit or sizing up for a slightly more relaxed (but still fitted) feel."
        ],
      },
      materials: {
        title: "Materials",
        list: [
          { label: "Yarn", description: "Worsted weight yarn (CYC 4). Approx. <strong><span class='size-dynamic' data-size-key='yarnAmountYards'>160</span> yds</strong> / <strong><span class='size-dynamic' data-size-key='yarnAmountMeters'>146</span> m</strong>. <br><em>Recommended: Soft merino or alpaca blend.</em><br><strong>Yarn Substitution Notes:</strong> Any worsted-weight yarn that achieves gauge and has good elasticity can be used." , icon: "FaPaintBrush"},
          { label: "Needles", description: "- US 7 (<span class='unit-dynamic' data-base-value='4.5' data-unit-type='mm_needle'>4.5 mm</span>) circular needles, 16-inch (<span class='unit-dynamic' data-base-value='40' data-unit-type='cm_cord'>40 cm</span>) cord (for brim).<br>- US 8 (<span class='unit-dynamic' data-base-value='5.0' data-unit-type='mm_needle'>5.0 mm</span>) circular needles, 16-inch (<span class='unit-dynamic' data-base-value='40' data-unit-type='cm_cord'>40 cm</span>) cord (for body).<br>- US 8 (<span class='unit-dynamic' data-base-value='5.0' data-unit-type='mm_needle'>5.0 mm</span>) DPNs or preferred method for small circumference knitting.", icon: "FaMagicWandSparkles" },
          { label: "Notions", description: "Stitch marker (for BOR), tapestry needle, scissors. Optional: pom-pom maker.", icon: "FaToolbox"},
          { label: "Gauge", description: "<strong>20 sts x 26 rnds</strong> = <span class='unit-dynamic' data-base-value='4' data-unit-type='length_plain'>4 inches</span> (<span class='unit-dynamic' data-base-value='10' data-unit-type='length_plain'>10 cm</span>) in K2, P2 ribbing using US 8 (<span class='unit-dynamic' data-base-value='5.0' data-unit-type='mm_needle'>5.0 mm</span>) needles, worked in the round, measured <em>unstretched after blocking</em>.<br><em><strong>To Swatch:</strong> CO at least 28-32 sts. Work in K2, P2 rib in the round for at least 4 inches. Block and measure.</em>", icon: "FaRulerVertical" }
        ]
      },
      instructions: {
        title: "Instructions",
        parts: [
          {
            subtitle: "1. Brim (2x2 Rib)",
            steps: [
              { id: "brim_1", text: "CO <strong><span class='size-dynamic' data-size-key='castOnSts'>110</span> sts</strong>.", },
              { id: "brim_2", text: "Place BOR marker and join for working in the round, being careful not to twist stitches." },
              { id: "brim_3", text: "<strong>Set-up Rnd:</strong> *K2, p2; rep from * to end of rnd." },
              { id: "brim_4", text: "Continue in 2x2 rib until brim measures <strong><span class='unit-dynamic size-dynamic' data-size-key='brimHeight' data-unit-type='length'>2 inches</span></strong> (approx. <span class='unit-dynamic size-dynamic' data-size-key='brimHeightCm' data-unit-type='length'>5 cm</span>) from CO edge, or desired length. For a folded brim, work for <span class='unit-dynamic' data-base-value='3.5-4' data-unit-type='length_range_text'>3.5-4 inches</span>." }
            ],
            proTip: "For a smoother transition to the body, knit all stitches on the last round of ribbing (optional)."
          },
          {
            subtitle: "2. Body (Stockinette Stitch)",
            steps: [
              {id: "body_1", text: "Change to <strong>US 8 (<span class='unit-dynamic' data-base-value='5.0' data-unit-type='mm_needle'>5.0 mm</span>) circular needles</strong>."},
              {id: "body_2", text: "<strong>Main Body Rnd:</strong> Knit all sts."},
              {id: "body_3", text: "Continue in Stockinette stitch (knit every rnd) until the entire piece measures <strong><span class='unit-dynamic size-dynamic' data-size-key='bodyLengthToDecreases' data-unit-type='length'>6.5 inches</span></strong> (approx. <span class='unit-dynamic size-dynamic' data-size-key='bodyLengthToDecreasesCm' data-unit-type='length'>16.5 cm</span>) from the CO edge (including brim).<br><em>(This is approx. <span class='unit-dynamic size-dynamic' data-size-key='stockinetteBodyLength' data-unit-type='length'>4.5 inches</span> / <span class='unit-dynamic size-dynamic' data-size-key='stockinetteBodyLengthCm' data-unit-type='length'>11.5 cm</span> of Stockinette stitch after the brim).</em>"}
            ],
            note: "<strong>Checkpoint:</strong> Ensure hat is at the correct height before starting crown decreases."
          },
          {
            subtitle: "3. Crown Shaping",
            attention: "<em>Switch to DPNs or preferred small-circumference method when stitches become too tight on circular needles.</em>",
            steps: [ // Simplified, refer to example's JS for full decrease sequence by size
              { id: "crown_1", text: "<strong>Dec Rnd 1:</strong> *K<span class='size-dynamic' data-size-key='decRnd1Knit'>9</span>, k2tog; rep from * to end. <span class='stitch-count size-dynamic' data-size-key='decRnd1Sts'>100</span>" },
              { id: "crown_2", text: "<strong>Next Rnd:</strong> Knit." },
              { id: "crown_3", text: "<strong>Dec Rnd 2:</strong> *K<span class='size-dynamic' data-size-key='decRnd2Knit'>8</span>, k2tog; rep from * to end. <span class='stitch-count size-dynamic' data-size-key='decRnd2Sts'>90</span>" },
              { id: "crown_4", text: "<strong>Next Rnd:</strong> Knit." },
              // ... continue for all decrease rounds. For brevity, only a few are listed.
              // Specific size conditional rows would be handled by filtering steps based on currentSize
               { id: "crown_15_generic", text: "Continue decrease rounds as specified for your size until 10 sts remain." }
            ]
          }
        ]
      },
      finishing: {
        title: "Finishing",
        steps: [
          "When <strong>10 sts</strong> rem: Cut yarn, leaving an <span class='unit-dynamic' data-base-value='8-10' data-unit-type='length_range_text'>8-10 inch</span> tail.",
          "Thread tail onto a tapestry needle. Pass needle through rem 10 sts as if to purl, slipping them off DPNs.",
          "Pull tail firmly to close the top opening.",
          "Bring yarn tail to the inside of the hat. Secure with a few knots and weave in the end.",
          "Weave in the CO tail at the brim.",
          "<strong>Blocking (Recommended):</strong> Gently wash beanie according to yarn care instructions. Squeeze out excess water (do not wring). Lay flat to dry, or shape over a balloon or bowl for a rounded crown. Blocking evens out stitches.",
          "<strong>Optional:</strong> Add a pom-pom."
        ],
        closingRemark: "<strong>Congratulations on finishing your Aurora Beanie!</strong>"
      },
       requiredSkills: {
        title: "Required Skills",
        skills: [
            { term: "Long-Tail Cast-On", definition: "A common, stretchy method for casting on stitches." },
            { term: "Knitting in the Round", definition: "Creating a seamless tube of fabric using circular or double-pointed needles." },
            // ... more skills
        ]
      },
      abbreviations: {
        title: "Abbreviations",
        list: [
            { term: "approx", definition: "approximately" },
            { term: "BOR", definition: "beginning of round" },
            // ... more abbreviations
        ]
      }
    },
    publishedDate: "2023-10-15T10:00:00Z",
    isSpotlight: true,
  },
  {
    id: "olsen-cardigan",
    slug: "olsen-cardigan",
    title: "Olsen Cardigan",
    imageUrl: PATTERN_PLACEHOLDER_IMAGE.replace('{seed}', 'olsen'),
    areumNote: "A classic, cozy cardigan with thoughtful details for a comfortable fit.",
    garmentType: GarmentType.Cardigan,
    construction: ConstructionType.Seamed,
    skillLevel: SkillLevel.Intermediate,
    skillTags: ["Seaming", "Buttonholes", "Shaping"],
    yarnWeight: YarnWeight.DK,
    mainYarn: "Designed for: DK Weight Wool",
    publishedDate: "2023-08-20T10:00:00Z",
  },
  {
    id: "meadowsweet-shawl",
    slug: "meadowsweet-shawl",
    title: "Meadowsweet Shawl",
    imageUrl: PATTERN_PLACEHOLDER_IMAGE.replace('{seed}', 'meadowsweet'),
    areumNote: "An elegant lace shawl, perfect for showcasing delicate fingering weight yarns.",
    garmentType: GarmentType.Shawl,
    construction: ConstructionType.SeamlessTopDown,
    skillLevel: SkillLevel.Experienced,
    skillTags: ["Lace", "Charts", "Blocking"],
    yarnWeight: YarnWeight.Fingering,
    mainYarn: "Designed for: Fingering Weight Silk Blend",
    publishedDate: "2024-01-10T10:00:00Z",
  },
   {
    id: "forest-path-hat",
    slug: "forest-path-hat",
    title: "Forest Path Hat",
    imageUrl: PATTERN_PLACEHOLDER_IMAGE.replace('{seed}', 'forestpath'),
    areumNote: "Textured cables evoke winding forest trails in this warm, worsted weight hat.",
    garmentType: GarmentType.Hat,
    construction: ConstructionType.SeamlessTopDown, // Bottom-up
    skillLevel: SkillLevel.Intermediate,
    skillTags: ["Cables", "Charts", "Knitting in the round"],
    yarnWeight: YarnWeight.Worsted,
    mainYarn: "Designed for: Rustic Worsted Wool",
    publishedDate: "2023-11-05T10:00:00Z",
  },
  {
    id: "city-stroll-sweater",
    slug: "city-stroll-sweater",
    title: "City Stroll Sweater",
    imageUrl: PATTERN_PLACEHOLDER_IMAGE.replace('{seed}', 'citystroll'),
    areumNote: "A modern, minimalist sweater with a focus on clean lines and comfortable fit.",
    garmentType: GarmentType.Sweater,
    construction: ConstructionType.SeamlessTopDown,
    skillLevel: SkillLevel.Intermediate,
    skillTags: ["Top-Down Raglan", "Short Rows", "Minimalist Design"],
    yarnWeight: YarnWeight.DK,
    mainYarn: "Designed for: Smooth DK Cotton Blend",
    publishedDate: "2024-02-18T10:00:00Z",
  }
];
    