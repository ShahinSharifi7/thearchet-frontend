<template>
  <div class="h-full flex flex-col items-center overflow-hidden font-sans text-gray-800 tracking-wide bg-[url('@/assets/background-low-op.png')] bg-repeat bg-[size:200px]">
    <!-- Header -->
    <div class="flex justify-center items-center h-[10vh] w-full mx-1"
         style="background-color: #C00000; color: white">
      <img :src="logo" alt="Logo" class="h-[80%] w-auto mx-1"/>
      <span class="text-[3vh] modak">Archet</span>
    </div>
    <!-- Filter Section -->
    <div class="w-5/6 mt-4 flex items-center justify-center">
      <select v-model="selectedInstrument" class="p-2 border rounded-md w-full" @change="filterInstruments">
        <option value="">All Instruments</option>
        <option v-for="instrument in instrumentTypes" :key="instrument" :value="instrument">
          {{ instrument }}
        </option>
      </select>
    </div>

    <!-- Store Items -->
    <div class="h-full flex flex-col w-5/6 space-y-4 mt-4 overflow-y-auto overflow-x-hidden">
      <div
          v-for="item in filteredInstruments"
          :key="item.model"
          class="flex items-center border rounded-md shadow-lg p-4 bg-white"
      >
        <!-- Instrument Image (Left) -->
        <img
            :src="item.pictureUrl || defaultImage"
            alt="Instrument Image"
            class="w-32 h-32 object-cover rounded-md flex-shrink-0"
        >

        <!-- Instrument Details (Right) -->
        <div class="ml-4 flex-1">
          <h2 class="font-bold text-lg">{{ item.brand }} - {{ item.model }}</h2>
          <p class="text-gray-700 font-semibold">{{ item.price }}</p>
          <a :href="item.url" target="_blank" class="text-blue-500 underline">Buy Now</a>
        </div>
      </div>
    </div>
    <div class="h-20"></div>

  </div>
</template>

<script>
import logo from "@/assets/New Logo.png";
import defaultImage from "@/assets/store/default.avif"
import BosendorferImperial from '@/assets/store/Bosendorfer Imperial 290.jpeg';
import Bosendorfer185VC from '@/assets/store/Bosendorfer 185VC.jpeg';
import Bosendorfer225 from '@/assets/store/Bosendorfer 225 Grand Piano.jpeg';
import FazioliF138 from '@/assets/store/Fazioli f138.jpeg';
import FazioliF228 from '@/assets/store/Fazioli f228.jpeg';
import FazioliF308 from '@/assets/store/Fazioli f308.jpeg';
import FenderFV1 from '@/assets/store/Fender FV-1.jpeg';
import FenderFV3 from '@/assets/store/Fender FV-3.jpeg';
import FenderFV5 from '@/assets/store/Fender FV-5.jpeg';
import HieronymusAmati from '@/assets/store/Hieronymus II Amati (1700s).jpeg';
import KawaiSKEX from '@/assets/store/kawai Shigeru Kawai SK-EX.jpeg';
import KeilwerthShadow from '@/assets/store/Keilwerth Shadow.jpeg';
import KeilwerthSX90 from '@/assets/store/Keilwerth SX90.jpeg';
import KeilwerthSX90R from '@/assets/store/Keilwerth SX90R.jpeg';
import MauriatBravo200 from '@/assets/store/P. Mauriat Le Bravo 200.jpeg';
import MauriatPMXA67R from '@/assets/store/P. Mauriat PMXA-67R.jpeg';
import MauriatSystem76 from '@/assets/store/P. Mauriat System 76.jpeg';
import KawaiGX2 from '@/assets/store/piano kawai gx-2.jpeg';
import KawaiK300 from '@/assets/store/piano kawai k-300.jpeg';
import SelmerMarkVI from '@/assets/store/saxophone Selmer Paris Selmer Mark VI.jpeg';
import SelmerSeriesIII from '@/assets/store/saxophone Selmer Paris Selmer Series III.jpeg';
import SelmerSupreme from '@/assets/store/saxophone Selmer Paris Selmer Supreme.jpeg';
import Yamaha875EX from '@/assets/store/saxophone Yamaha YTS-875EX.jpeg';
import Yamaha82Z from '@/assets/store/saxophone Yamaha YAS-82Z.jpeg';
import Yamaha62 from '@/assets/store/saxophone yamaha  YAS-62.jpeg';
import AmatiCharlesIX from '@/assets/store/violin amati  Andrea Amati Charles IX (1560).jpeg';
import GuarneriIlCannone from '@/assets/store/violin Guarneri del Gesù Il Cannone (1743).jpeg';
import GuarneriLordWilton from '@/assets/store/violin Guarneri del Gesù Lord Wilton (1742).jpeg';
import GuarneriVieuxtemps from '@/assets/store/violin Guarneri del Gesù Vieuxtemps Guarneri (1741).jpeg';
import StradivariusLadyBlunt from '@/assets/store/violin Stradivarius Lady Blunt  (1721).jpeg';
import StradivariusMessiah from '@/assets/store/violin Stradivarius Messiah Stradivarius (1716).jpeg';
import StradivariusSoil from '@/assets/store/violin Stradivarius Soil  (1714).jpeg';
import YamahaYSV104 from '@/assets/store/violin Yamaha YSV104.jpeg';
import AmatiGrandPattern from '@/assets/store/violin_amati_Andrea_Amati_Nicolò_Amati_Grand_Pattern_1650s.jpeg';
import YamahaCFX from '@/assets/store/yamaha cfx.jpeg';
import YamahaCLP785 from '@/assets/store/yamaha CLP-785 (Clavinova).jpeg';
import YamahaSV250 from '@/assets/store/Yamaha SV-250.jpeg';
import YamahaU1 from '@/assets/store/yamaha u1.jpeg';
import YamahaV10G from '@/assets/store/Yamaha V10G.jpeg';
import YanagisawaAWO20 from '@/assets/store/Yanagisawa AWO20.jpeg';
import YanagisawaSWO10 from '@/assets/store/Yanagisawa S-WO10.jpeg';
import YanagisawaTWO2 from '@/assets/store/Yanagisawa T-WO2.jpeg';
import epiphoneCasino from "@/assets/store/Epiphone Casino.png";
import epiphoneLesPaul from "@/assets/store/Epiphone Les Paul.png";
import epiphoneSG from "@/assets/store/Epiphone SG.png";
import fenderPlayerII from "@/assets/store/Fender Player II.png";
import fenderPlayerIITelecaster from "@/assets/store/Fender Player II Telecaster.png";
import fenderPlayerIIJazzmaster from "@/assets/store/Fender Player II Jazzmaster.png";
import gibsonHummingbird from "@/assets/store/Gibson - Hummingbird.png";
import gibsonES335 from "@/assets/store/Gibson ES335.png";
import gibsonJ45 from "@/assets/store/Gibson J-45.png";
import gibsonLesPaul from "@/assets/store/Gibson Les Paul.png";
import gibsonSGStandard from "@/assets/store/Gibson SG Standard.png";
import gibsonStudioAcoustic from "@/assets/store/Gibson Studio Acoustic.png";
import ibanezAZ2204 from "@/assets/store/Ibanez AZ2204.png";
import ibanezJEM7V from "@/assets/store/Ibanez JEM7V.png";
import ibanezRG from "@/assets/store/Ibanez RG.png";
import martinLX1 from "@/assets/store/Martin LX1.png";
import martin15M from "@/assets/store/Martin 15M.png";
import martinD28 from "@/assets/store/Martin D-28.png";
import prsJohnMayer from "@/assets/store/PRS Jogn Mayer.png";
import prsMcCarty from "@/assets/store/PRS SE McCarty.png";
import prsSE from "@/assets/store/PRS-SE.png";
import seagullEntourage from "@/assets/store/Seagull Entrourage.png";
import seagullMaritime from "@/assets/store/Seagull Maritime.png";
import seagullS6 from "@/assets/store/Seagull S6.png";
import taylorGSmini from "@/assets/store/Taylor GS Mini.png";
import taylor214ce from "@/assets/store/Taylor 214ce.png";
import taylor814ce from "@/assets/store/Taylor 814ce.png";
import YamahaFG800M from "@/assets/store/Yamaha FG800M.png"
import YamahaAPX600 from "@/assets/store/Yamaha APX600.png"
import YamahaLL16 from "@/assets/store/Yamaha LL16.png"


export default {
  data() {
    return {
      logo: logo,
      defaultImage: defaultImage,
      selectedInstrument: "",
      instruments: [
        {
          brand: "Ludwig",
          model: "Accent Series",
          price: "$625.00",
          url: "https://www.tomleemusic.ca/ludwig-accent-drive-5-piece-drum-kit-22161210sd-with-hardware-wuhan-cymbals-227217?srsltid=AfmBOoqItCzPFHV7FstUuRN6wF3bmbWvS0iijsd95QzCooUYpEoJ9oTU",
          pictureUrl: "https://www.tomleemusic.ca/media/catalog/product/cache/7b59eeedc8a9391b10c489498e31e772/2/2/227217.jpg",
          type: "Drums"
        },
        {
          brand: "Pearl",
          model: "Roadshow",
          price: "$649.99",
          url: "https://shop.theartsmusicstore.com/collections/pearl-roadshow-series/products/pearl-rs584cc91-4-piece-roadshow-kit-in-red-wine-1",
          pictureUrl: "https://shop.theartsmusicstore.com/cdn/shop/products/0000_a027b541-04d4-40cd-b9bf-c144af18f55e_1024x1024.jpg?v=1680540998",
          type: "Drums"
        },
        {
          brand: "Yamaha",
          model: "RYDEEN",
          price: "$1099.99",
          url: "https://www.tomleemusic.ca/yamaha-rydeen-5-piece-drum-set-22101216snare-with-hardware-cymbals-throne-206139?srsltid=AfmBOoreaVYS-XDwQpi4VTG2OELaeUBzRe2EFAeAK5hbgTvlEg9gMrvP",
          pictureUrl: "https://www.tomleemusic.ca/media/catalog/product/cache/7b59eeedc8a9391b10c489498e31e772/s/c/screen_shot_2020-02-28_at_4.07.40_pm.png",
          type: "Drums"
        },
        {
          brand: "Yamaha",
          model: "Stage Custom",
          price: "$1099.99",
          url: "https://www.drumland.com/products/yamaha-stage-custom-5pc-600-hardware-included-10t-12t-14sn-14ft-20bd",
          pictureUrl: "https://www.drumland.com/cdn/shop/products/l18912.jpg?height=600&v=1735353777&width=600",
          type: "Drums"
        },
        {
          brand: "Pearl",
          model: "Decade Maple",
          price: "$1379.99",
          url: "https://www.long-mcquade.com/409344/Drums/Acoustic-Drums-Sets/Pearl/Decade-Maple-5-Piece-Shell-Pack-22-10-12-16-SD-Matte-Racing-Red.htm",
          pictureUrl: "https://cdn.long-mcquade.com/files/409344/lg_3096d60051ca6f04c978fcd138254e2f.jpg",
          type: "Drums"
        },
        {
          brand: "Ludwig",
          model: "Element Evolution",
          price: "$1599.99",
          url: "https://www.drumland.com/products/ludwig-evolution-6pc-shell-pack-w-hardware-cymbals-incl-10-12-14-16-14sn-22bd-copper-sparkle?srsltid=AfmBOoraEvJuAWGcsIJLCDSy8u_mjFMWSnQO1voWnDCb0CE0ZgUBV2S_",
          pictureUrl: "https://www.drumland.com/cdn/shop/products/LudEvolution226PCcopper.jpg?height=600&v=1735353399&width=600",
          type: "Drums"
        },
        {
          brand: "Pearl",
          model: "Demo MCX",
          price: "$2449.00",
          url: "https://shop.theartsmusicstore.com/collections/acoustic-drums/products/pearl-demo-mcx-4-piece-shell-pack-wihwp930-in-purple-sparkle-burst-mcx924spec369",
          pictureUrl: "https://shop.theartsmusicstore.com/cdn/shop/products/0000_c0da6f83-7f81-436e-9dcb-8f2f3d513cbe_1024x1024.jpg?v=1637608664",
          type: "Drums"
        },
        {
          brand: "Ludwig",
          model: "Classic Maple",
          price: "$3699.99",
          url: "https://www.drumland.com/collections/ludwig/products/ludwig",
          pictureUrl: "https://www.drumland.com/cdn/shop/files/s36043.jpg?v=1735351815&width=5000",
          type: "Drums"
        },
        {
          brand: "Yamaha",
          model: "Absolute Hybrid Maple",
          price: "$3799.99",
          url: "https://www.drumland.com/collections/yamaha/products/yamaha-am0f50-5-piece-absolute-hybrid-maple-shell-pack",
          pictureUrl: "https://www.drumland.com/cdn/shop/products/s19143.jpg?height=600&v=1735360722&width=600",
          type: "Drums"
        },
        {
          brand: "Yamaha",
          model: "CFX",
          price: "$92419.00",
          url: "https://www.coachhousepianos.co.uk/product/new-yamaha-c6x-grand-piano/?attribute_pa_colour=black-polish&srsltid=AfmBOopGnaXKBHeipzjQgcpmInAUzSWOGI1vU-Rhf_Rr_PZUq3ZrXYPo0W4",
          pictureUrl: YamahaCFX,
          type: "Piano"
        },
        {
          brand: "Yamaha",
          model: "U1",
          price: "$17511.00",
          url: "https://www.coachhousepianos.co.uk/product/new-yamaha-u1-upright-piano/?attribute_pa_colour=black-polish&srsltid=AfmBOoreAqx2tAiDkb9gpkY66WXQS42MppGD0Dxsb_bR2NXgAQ6PCAykCCw",
          pictureUrl: YamahaU1,
          type: "Piano"
        },
        {
          brand: "Yamaha",
          model: "CLP-785 (Clavinova)",
          price: "$10079.00",
          url: "https://www.pianoheritage.com/shop/yamaha-pianos/digital-pianos/yamaha-clp-795gp-clavinova/?attribute_pa_color=polished-ebony&gad_source=4&gclid=CjwKCAiArKW-BhAzEiwAZhWsIKrmEDPqLGnL0JvDi8cXyQyCd_FfrhyOpTggtbtMLm2OPDjukN6YfhoCrF4QAvD_BwE",
          pictureUrl: YamahaCLP785,
          type: "Piano"
        },
        {
          brand: "Kawai",
          model: "Shigeru Kawai SK-EX",
          price: "$294955.00",
          url: "https://www.coachhousepianos.co.uk/product/new-shigeru-kawai-sk-ex-grand-piano/?srsltid=AfmBOoodydZMqRG5o1TkQ1EIqwNPnLjconvcvnTtZ1t-TAOpYlvhdKnLiXY",
          pictureUrl: KawaiSKEX,
          type: "Piano"
        },
        {
          brand: "Kawai",
          model: "GX-2",
          price: "$31883.00",
          url: "https://www.coachhousepianos.co.uk/product/new-kawai-gx2-grand-piano/?attribute_pa_colour=polished-black&srsltid=AfmBOopE-Z1vBIhBKIi6fH-EXsoji2-DDj5Kt_FWTqZpD0LJBBzRbAzBUf0",
          pictureUrl: KawaiGX2,
          type: "Piano"
        },
        {
          brand: "Kawai",
          model: "K-300",
          price: "$19895.00",
          url: "https://www.merriammusic.com/product/kawai-k-300-aures/?attribute_pa_condition=new-regular&srsltid=AfmBOoqEqwaTreqVRf4NnIKPnQ-ukW9E2ZAB-wZ3ertA42qobEX9ArUENPo",
          pictureUrl: KawaiK300,
          type: "Piano"
        },
        {
          brand: "Bosendorfer",
          model: "Imperial 290",
          price: "$361621.99",
          url: "https://www.coachhousepianos.co.uk/product/new-bosendorfer-290-imperial-grand-piano/?srsltid=AfmBOopGgZD09dLGdARMwOv3EnvpgBor3zecf24pJbM46OTkL1yGJXZoRZ4",
          pictureUrl: BosendorferImperial,
          type: "Piano"
        },
        {
          brand: "Bosendorfer",
          model: "225 Grand Piano",
          price: "$251281.83",
          url: "https://www.coachhousepianos.co.uk/product/new-bosendorfer-225-grand-piano/?srsltid=AfmBOoqNXOQBLw99Tzm6EZJmUiL6eIG1jkbshw4e-meYU1eTfgqMoAmkDHE",
          pictureUrl: Bosendorfer225,
          type: "Piano"
        },
        {
          brand: "Bosendorfer",
          model: "185VC",
          price: "$180813.14",
          url: "https://www.coachhousepianos.co.uk/product/new-bosendorfer-185-vc-grand-piano/?srsltid=AfmBOooUnC8SQ1vi4xkOCD_qdNSD0e1IoGuMuFANps-y7spkaR6ciXXRC-I",
          pictureUrl: Bosendorfer185VC,
          type: "Piano"
        },
        {
          brand: "Fazioli",
          model: "F308 ",
          price: "$234000.00",
          url: "https://remenyi.com/products/fazioli-308-concert-grand-piano",
          pictureUrl: FazioliF308,
          type: "Piano"
        },
        {
          brand: "Fazioli",
          model: "F228",
          price: "$200600.00",
          url: "https://remenyi.com/products/fazioli-228-concert-grand-piano",
          pictureUrl: FazioliF228,
          type: "Piano"
        },
        {
          brand: "Fazioli",
          model: "F183",
          price: "$99900.00",
          url: "https://remenyi.com/products/fazioli-183-grand-piano",
          pictureUrl: FazioliF138,
          type: "Piano"
        },
        {
          brand: "Stradivarius",
          model: "Messiah Stradivarius (1716)",
          price: "$98000.00",
          url: "https://lutheriepatriceboucher.ca/Messiah1716VI.html?srsltid=AfmBOopI5D4x4z-Cdxg-U5ZAF1Z_GfoaUIdFfNStYvXRgdY__CEYgq1EFSc",
          pictureUrl: StradivariusMessiah,
          type: "Violin"
        },
        {
          brand: "Stradivarius",
          model: "Lady Blunt Stradivarius (1721)",
          price: "$2600.00",
          url: "https://lutheriepatriceboucher.ca/Mirecourt1721.html?srsltid=AfmBOop2O0tHVQ7dpj_qbacP9Ps9_dz8FW3UwJoiOY8Br9n2adERC2Ev2uI",
          pictureUrl: StradivariusLadyBlunt,
          type: "Violin"
        },
        {
          brand: "Stradivarius",
          model: "Soil Stradivarius (1714)",
          price: "$1500.00",
          url: "https://lutheriepatriceboucher.ca/AltoRougeDosUnePiece.html?srsltid=AfmBOopF2uGUMzC4kXPPvuqLMq5oDY7vKhUiUMhKEKR2DuC87ZSMPfBCVFQ",
          pictureUrl: StradivariusSoil,
          type: "Violin"
        },
        {
          brand: "Guarneri del Ges\u00f9",
          model: "Il Cannone (1743)",
          price: "$4584.00",
          url: "https://fiddlover.com/products/fiddlover-premium-cannone-1743-violin-cr7005?currency=USD&variant=41064837054507&utm_source=google&utm_medium=cpc&utm_campaign=Google+Shopping&stkn=ddc833c03d53&srsltid=AfmBOorFDIIjVpbRrIOOl6fu4gju_80DYdo8IkT5hm12i3Xn9KkaoGq",
          pictureUrl: GuarneriIlCannone,
          type: "Violin"
        },
        {
          brand: "Guarneri del Ges\u00f9",
          model: "Vieuxtemps Guarneri (1741)",
          price: "$41125.00",
          url: "https://www.violincellomaker.com/products/mina-mazzolari-cremona-2021-copy-of-guarneri-del-gesu-ysaye?variant=39292896313442&currency=EUR&utm_medium=product_sync&utm_source=google&utm_content=sag_organic&utm_campaign=sag_organic&srsltid=AfmBOorAgethXWKKj-",
          pictureUrl: GuarneriVieuxtemps,
          type: "Violin"
        },
        {
          brand: "Guarneri del Ges\u00f9",
          model: "Lord Wilton (1742)",
          price: "$12300.00",
          url: "https://fiddlover.com/products/fiddlover-guarneris-lord-wilton-1742-violin-cr7021?currency=USD&variant=41083627733035&utm_source=google&utm_medium=cpc&utm_campaign=Google+Shopping&stkn=ddc833c03d53&srsltid=AfmBOop80pu-69HAm66a6ZM84qhmn_tBR8wBlI0yIOgrLX3Fv",
          pictureUrl: GuarneriLordWilton,
          type: "Violin"
        },
        {
          brand: "Amati ",
          model: "Andrea Amati \"Charles IX\" (1560)",
          price: "$2800.00",
          url: "AfmBOornBin8rX4LEIfTuH9wwfln0evpbcdT6XjAPIYEAq5gVjWeh1bkS0A",
          pictureUrl: AmatiCharlesIX,
          type: "Violin"
        },
        {
          brand: "Amati ",
          model: "Nicol\u00f2 Amati Grand Pattern (1650s)",
          price: "$2400.00",
          url: "https://lutheriepatriceboucher.ca/AmatiSoliste.html?srsltid=AfmBOorKOO942f8POvUxkeGNtZ-y9HHdHUkuVcw-ujPVZvQ4rNpubkG50l8",
          pictureUrl: AmatiGrandPattern,
          type: "Violin"
        },
        {
          brand: "Amati ",
          model: "Hieronymus II Amati (1700s)",
          price: "$3175.00",
          url: "https://reverb.com/ca/item/86083222-violin-labeled-nikolaus-amatus-fecit-anno-1634-markneukirchen-germany?utm_campaign=INTL-CA-Shop_unpaid&utm_medium=cpc&utm_source=google",
          pictureUrl: HieronymusAmati,
          type: "Violin"
        },
        {
          brand: "Yamaha",
          model: "Yamaha YSV104",
          price: "$1199.00",
          url: "https://www.twiggmusique.com/en/violon-silencieux-yamaha-ysv104.html?srsltid=AfmBOorfrvS1ngkU5gRN0RsBOc_FZK0bOy0b6ELSlxY49E26eHqDfmSWSQs",
          pictureUrl: YamahaYSV104,
          type: "Violin"
        },
        {
          brand: "Yamaha",
          model: "Yamaha V10G",
          price: "$3299.00",
          url: "https://avamusic.com/products/v10sg-yamaha-violin?variant=43865486131361&country=CA&currency=CAD&utm_medium=product_sync&utm_source=google&utm_content=sag_organic&utm_campaign=sag_organic&srsltid=AfmBOoompHOr82b_b8yx1ON1oDfzGwsIWEvMkw5Ls4eHYZAJrIufhzIgrEE",
          pictureUrl: YamahaV10G,
          type: "Violin"
        },
        {
          brand: "Yamaha",
          model: "Yamaha SV-250",
          price: "$2647.00",
          url: "https://detec.in/products/yamaha-sv250-natural-silent-violin?variant=45628035170524&country=IN&currency=INR&utm_medium=product_sync&utm_source=google&utm_content=sag_organic&utm_campaign=sag_organic&srsltid=AfmBOorx1-pBb66NSwB-b_P9kKeo-tWX4scKHVphQwU4GNYu",
          pictureUrl: YamahaSV250,
          type: "Violin"
        },
        {
          brand: "Fender",
          model: "Fender FV-1",
          price: "$1050.00",
          url: "https://reverb.com/ca/item/87301861-fender-fv-3-deluxe-electric-violin-2000-sunburst?utm_campaign=INTL-CA-Shop_unpaid&utm_medium=cpc&utm_source=google",
          pictureUrl: FenderFV1,
          type: "Violin"
        },
        {
          brand: "Fender",
          model: "Fender FV-3",
          price: "$2634.00",
          url: "https://reverb.com/ca/item/40864492-fender-fv3-deluxe-electric-violin-flamed-sunburst-in-mint-condition-with-hygrometer-hard-case-and-ac?utm_campaign=INTL-CA-Shop_unpaid&utm_medium=cpc&utm_source=google",
          pictureUrl: FenderFV3,
          type: "Violin"
        },
        {
          brand: "Fender",
          model: "Fender FV-5",
          price: "$1099.00",
          url: "https://allyouneedmusic.com/products/yamaha-yev-105-electric-violin?variant=42654248435935&currency=CAD&utm_source=google&utm_medium=cpc&utm_campaign=google%2Bshopping&srsltid=AfmBOoqeH-m1KXNxvXPZZWO0p1XNlTsob1TFSmkpqybT6UETmMZQlHY7S-g",
          pictureUrl: FenderFV5,
          type: "Violin"
        },
        {
          brand: "Fender",
          model: "Player II Stratocaster aquatone blue",
          price: "$1149.99",
          url: "https://www.long-mcquade.com/387740/Guitars/Electric-Guitars/Fender-Musical-Instruments/Player-II-Stratocaster-Maple-Fingerboard-Aquatone-Blue.htm",
          pictureUrl: fenderPlayerII,
          type: "Electric Guitar"
        },
        {
          brand: "Fender",
          model: "Player II Telecaster",
          price: "$1299.99",
          url: "https://www.long-mcquade.com/387910/Guitars/Electric-Guitars/Fender-Musical-Instruments/Player-II-Telecaster-Maple-Fingerboard-Butterscotch-Blonde.htm",
          pictureUrl: fenderPlayerIITelecaster,
          type: "Electric Guitar"
        },
        {
          brand: "Fender",
          model: "Player II Jazzmaster, Rosewood Fingerboard",
          price: "$1199.99",
          url: "https://www.long-mcquade.com/387660/Guitars/Electric-Guitars/Fender-Musical-Instruments/Player-II-Jazzmaster-Rosewood-Fingerboard-3-Color-Sunburst.htm",
          pictureUrl: fenderPlayerIIJazzmaster,
          type: "Electric Guitar"
        },
        {
          brand: "Gibson",
          model: "Les Paul Standard 60s - Bourbon Burst",
          price: "$999.00",
          url: "https://www.long-mcquade.com/164736/Guitars/Electric-Guitars/Epiphone/Les-Paul-Standard-60s-Bourbon-Burst.htm",
          pictureUrl: gibsonLesPaul,
          type: "Electric Guitar"
        },
        {
          brand: "Gibson",
          model: "SG Standard Electric Guitar with Gigbag - Heritage Cherry",
          price: "$2499.00",
          url: "https://www.long-mcquade.com/136740/Guitars/Electric-Guitars/Gibson/SG-Standard-Electric-Guitar-with-Gigbag-Heritage-Cherry.htm",
          pictureUrl: gibsonSGStandard,
          type: "Electric Guitar"
        },
        {
          brand: "Gibson",
          model: "ES-335 DOT Semi-Hollow Body Electric",
          price: "$4699.00",
          url: "https://www.long-mcquade.com/183268/Guitars/Left-Hand-Acoustics-Electrics/Gibson/ES-335-DOT-Semi-Hollow-Body-Electric-Left-Handed-Vintage-Burst.htm",
          pictureUrl: gibsonES335,
          type: "Electric Guitar"
        },
        {
          brand: "PRS",
          model: "SE Custom 24 Electric Guitar with Gigbag - Charcoal Cherry Burst",
          price: "$1219.00",
          url: "https://www.long-mcquade.com/403586/Guitars/Electric-Guitars/Paul-Reed-Smith/SE-Custom-24-Electric-Guitar-with-Gigbag-Charcoal-Cherry-Burst.htm",
          pictureUrl: prsSE,
          type: "Electric Guitar"
        },
        {
          brand: "PRS",
          model: "John Mayer Silver Sky SE Electric Guitar with Gigbag - Piano Black",
          price: "$1219.00",
          url: "https://www.long-mcquade.com/378844/Guitars/Electric-Guitars/Paul-Reed-Smith/John-Mayer-Silver-Sky-SE-Electric-Guitar-with-Gigbag-Piano-Black.htm",
          pictureUrl: prsJohnMayer,
          type: "Electric Guitar"
        },
        {
          brand: "PRS",
          model: "SE McCarty 594 Singlecut Electric Guitar with Gigbag - Vintage Sunburst",
          price: "$1289.00",
          url: "https://www.long-mcquade.com/311396/Guitars/Electric-Guitars/Paul-Reed-Smith/SE-McCarty-594-Singlecut-Electric-Guitar-with-Gigbag-Vintage-Sunburst.htm",
          pictureUrl: prsMcCarty,
          type: "Electric Guitar"
        },
        {
          brand: "Ibanez",
          model: "RG Genesis Collection 6-String Electric Guitar",
          price: "$1469.99",
          url: "https://www.long-mcquade.com/?page=search&SearchTxt=ibanez%20RG550",
          pictureUrl: ibanezRG,
          type: "Electric Guitar"
        },
        {
          brand: "Ibanez",
          model: "AZ2204",
          price: "$2100.00",
          url: "https://www.long-mcquade.com/?page=search&SearchTxt=IBANEZ%20AZ2204",
          pictureUrl: ibanezAZ2204,
          type: "Electric Guitar"
        },
        {
          brand: "Ibanez",
          model: "JEM7V",
          price: "$2659.99",
          url: "https://www.long-mcquade.com/326481/Guitars/Electric-Guitars/Ibanez/JEM7VP-JEM-Premium-Electric-Guitar-with-Gigbag-White.htm",
          pictureUrl: ibanezJEM7V,
          type: "Electric Guitar"
        },
        {
          brand: "Epiphone",
          model: "Les Paul Standard",
          price: "$999.00",
          url: "https://www.long-mcquade.com/173296/Guitars/Left-Hand-Acoustics-Electrics/Epiphone/Les-Paul-Standard-50s-Left-Handed-Heritage-Cherryburst.htm",
          pictureUrl: epiphoneLesPaul,
          type: "Electric Guitar"
        },
        {
          brand: "Epiphone",
          model: "SG Special P-90",
          price: "$669.00",
          url: "https://www.long-mcquade.com/164928/Guitars/Electric-Guitars/Epiphone/SG-Special-P-90-Sparkling-Burgundy.htm",
          pictureUrl: epiphoneSG,
          type: "Electric Guitar"
        },
        {
          brand: "Epiphone",
          model: "Casino-Vintage Sunburst",
          price: "$1029.00",
          url: "https://www.long-mcquade.com/329061/Guitars/Electric-Guitars/Epiphone/Casino-Electric-Guitar-Vintage-Sunburst.htm",
          pictureUrl: epiphoneCasino,
          type: "Electric Guitar"
        },
        {
          brand: "Taylor",
          model: "314ce Grand Auditorium Acoustic/Electric Guitar w/ V-Class Bracing",
          price: "$3299.00",
          url: "https://www.long-mcquade.com/113384/Guitars/Acoustic-Guitars/Taylor-Guitars/314ce-Grand-Auditorium-https://www.long-mcquade.com/189208/Guitars/Acoustic-Guitars/Taylor-Guitars/814ce-Grand-Auditorium-Spruce-Rosewood-Acoustic-Electric-Guitar-w-Armrest.htm",
          pictureUrl: taylor214ce,
          type: "Acoustic Guitar"
        },
        {
          brand: "Taylor",
          model: "814ce Grand Auditorium Spruce",
          price: "$5799.00",
          url: "https://www.long-mcquade.com/189208/Guitars/Acoustic-Guitars/Taylor-Guitars/814ce-Grand-Auditorium-Spruce-Rosewood-Acoustic-Electric-Guitar-w-Armrest.htm",
          pictureUrl: taylor814ce,
          type: "Acoustic Guitar"
        },
        {
          brand: "Taylor",
          model: "GS Mini",
          price: "$849.00",
          url: "https://www.long-mcquade.com/19531/Guitars/Acoustic-Guitars/Taylor-Guitars/GS-Mini-with-Mahogany-Top.htm",
          pictureUrl: taylorGSmini,
          type: "Acoustic Guitar"
        },
        {
          brand: "Martin",
          model: "D-28 Dreadnought",
          price: "$4419.00",
          url: "https://www.long-mcquade.com/5247/Guitars/Acoustic-Guitars/Martin-Guitars/D-28-Dreadnought-Acoustic-Guitar.htm",
          pictureUrl: martinD28,
          type: "Acoustic Guitar"
        },
        {
          brand: "Martin",
          model: "000-15M Solid Mahogany",
          price: "$2449.00",
          url: "https://www.long-mcquade.com/7387/Guitars/Acoustic-Guitars/Martin-Guitars/000-15M-Solid-Mahogany-Acoustic-Guitar.htm",
          pictureUrl: martin15M,
          type: "Acoustic Guitar"
        },
        {
          brand: "Martin",
          model: "LX1 Little Martin",
          price: "$649.00",
          url: "https://www.long-mcquade.com/7099/Guitars/Acoustic-Guitars/Martin-Guitars/LX1-Little-Martin-Acoustic-Guitar.htm",
          pictureUrl: martinLX1,
          type: "Acoustic Guitar"
        },
        {
          brand: "Gibson",
          model: "J-45 Aged Vintage Sunburst",
          price: "$1069.00",
          url: "https://www.long-mcquade.com/210400/Guitars/Acoustic-Guitars/Epiphone/Inspired-by-Gibson-J-45-Aged-Vintage-Sunburst.htm",
          pictureUrl: gibsonJ45,
          type: "Acoustic Guitar"
        },
        {
          brand: "Gibson",
          model: "Hummingbird",
          price: "$6199.00",
          url: "https://www.long-mcquade.com/404316/Guitars/Acoustic-Guitars/Gibson/Hummingbird-Standard-Rosewood-EC-Acoustic-Electric-Guitar-with-Hardshell-Case-Rosewood-Burst.htm",
          pictureUrl: gibsonHummingbird,
          type: "Acoustic Guitar"
        },
        {
          brand: "Gibson",
          model: "EL-00 Studio Acoustic/Electric - Vintage Sunburst",
          price: "$649.00",
          url: "https://www.long-mcquade.com/19689/Guitars/Acoustic-Guitars/Epiphone/EL-00-Studio-Acoustic-Electric-Vintage-Sunburst.htm",
          pictureUrl: gibsonStudioAcoustic,
          type: "Acoustic Guitar"
        },
        {
          brand: "Yamaha",
          model: "FG800M",
          price: "$279.99",
          url: "https://www.long-mcquade.com/69623/Guitars/Acoustic-Guitars/Yamaha/FG800M-Solid-Spruce-Top-Acoustic-Guitar-w-Matte-Finish.htm",
          pictureUrl: YamahaFG800M,
          type: "Acoustic Guitar"
        },
        {
          brand: "Yamaha",
          model: "LL16 ARE ",
          price: "$1249.99",
          url: "https://www.long-mcquade.com/90883/Guitars/Acoustic-Guitars/Yamaha/LL16-ARE-Dreadnought-Spruce-Top-Dreadnaught-Acoustic-Electric-Natural.htm",
          pictureUrl: YamahaLL16,
          type: "Acoustic Guitar"
        },
        {
          brand: "Yamaha",
          model: "APX600 Natural",
          price: "$469.99",
          url: "https://www.long-mcquade.com/97809/Guitars/Acoustic-Guitars/Yamaha/APX600-Acoustic-Electric-Guitar-Natural.htm",
          pictureUrl: YamahaAPX600,
          type: "Acoustic Guitar"
        },
        {
          brand: "Seagull",
          model: "S6 Original",
          price: "$799.00",
          url: "https://www.long-mcquade.com/96115/Guitars/Acoustic-Guitars/Godin-Guitars/S6-Original.htm",
          pictureUrl: seagullS6,
          type: "Acoustic Guitar"
        },
        {
          brand: "Seagull",
          model: "Maritime SWS Concert Hall CW Spruce/Mahogany",
          price: "$1169.00",
          url: "https://www.long-mcquade.com/289366/Guitars/Acoustic-Guitars/Godin-Guitars/Maritime-SWS-Concert-Hall-CW-Spruce-Mahogany-Acoustic-Electric-Guitar.htm",
          pictureUrl: seagullMaritime,
          type: "Acoustic Guitar"
        },
        {
          brand: "Seagull",
          model: "Entourage Rustic Concert Hall",
          price: "$799.00",
          url: "https://www.long-mcquade.com/383320/Guitars/Acoustic-Guitars/Godin-Guitars/Entourage-Concert-Hall-Acoustic-Electric-Guitar-with-Cutaway-Rustic-Burst.htm",
          pictureUrl: seagullEntourage,
          type: "Acoustic Guitar"
        },
        {
          brand: "Yamaha",
          model: " YFL-222",
          price: "$1153.00",
          url: "https://www.sweetwater.com/store/detail/YFL222CG--yamaha-yfl-222-student-flute-with-offset-g-key-system?_queryID=fdedb5e7ebb9cce11ea8f520d5f665c3&_index=production_products",
          pictureUrl: "https://media.sweetwater.com/m/products/image/23eac5f14arLkcVwMd1eCQOwk9F1FxQXJzNvPpuA.jpg?quality=82&width=750&ha=23eac5f14a859a6b",
          type: "Flute"
        },
        {
          brand: "Yamaha",
          model: "YFL-362H",
          price: "$1697.99",
          url: "https://www.sweetwater.com/store/detail/YFL362BOGSH--yamaha-yfl-362h-intermediate-flute",
          pictureUrl: "https://media.sweetwater.com/m/products/image/9a714b930dcrVZajC7zb37drOhI4KbvpBzxH4dSf.jpg?quality=82&width=750&ha=9a714b930dcd26b6",
          type: "Flute"
        },
        {
          brand: "Yamaha",
          model: "YFL-677H",
          price: "$4631.99",
          url: "https://www.sweetwater.com/store/detail/YFL677BOGT--yamaha-yfl-677h-professional-flute-cnumber-trill-split-e-and-gizmo-key",
          pictureUrl: "https://media.sweetwater.com/m/products/image/072e608de8LV1vTMlnoGc4SHAZVTPMtwJUolxkE3.jpg?quality=82&width=750&ha=072e608de8ba32d8",
          type: "Flute"
        },
        {
          brand: "Pearl",
          model: "Quantz 665",
          price: "$1605.00",
          url: "https://www.flutespecialists.com/product/pearl-quantz-665-flute/",
          pictureUrl: "https://res.cloudinary.com/flute-specialists-inc/images/f_auto,q_auto/v1662142520/perl/opt/pearl_quantz_665rbe-1_sq1000_nuqjld/pearl_quantz_665rbe-1_sq1000_nuqjld.jpg?_i=AA",
          type: "Flute"
        },
        {
          brand: "Pearl",
          model: "Dolce 695RBE",
          price: "$3617.00",
          url: "https://flutecenter.com/products/pearl-dolce-series-flute-model-695-new",
          pictureUrl: "https://flutecenter.com/cdn/shop/files/prl_695-OS-E-C_-D__1_fc899bb8-8ae7-4147-8519-17fc50baa3aa.png?v=1708460008&width=3000",
          type: "Flute"
        },
        {
          brand: "Pearl",
          model: "Elegante 795RBE",
          price: "$3545.00",
          url: "https://www.musicarts.com/pearl-flutes-795-elegante-series-flute-main0134961",
          pictureUrl: "https://media.musicarts.com/is/image/MMGS7/466959000902000-00-2000x2000.jpg",
          type: "Flute"
        },
        {
          brand: "Muramatsu",
          model: "EX",
          price: "$6821.00",
          url: "https://flutecenter.com/products/muramatsu-ex",
          pictureUrl: "https://flutecenter.com/cdn/shop/files/mur_EX_1_fa0c649d-c3ae-41a7-aa19-08703f98d7a6.png?v=1730818532&width=3000",
          type: "Flute"
        },
        {
          brand: "Muramatsu",
          model: "GX",
          price: "$10303.00",
          url: "https://flutecenter.com/products/muramatsu-gx?_pos=1&_psq=Muramatsu+GX+Model&_ss=e&_v=1.0",
          pictureUrl: "https://flutecenter.com/cdn/shop/files/mur_gx_1_027eb785-0dfd-46d5-9f58-65ebe32533d6.png?v=1730818959&width=3000",
          type: "Flute"
        },
        {
          brand: "Muramatsu",
          model: "DS",
          price: "$14221.00",
          url: "https://flutecenter.com/products/muramatsu-ds?_pos=1&_psq=Muramatsu+DS+Model&_ss=e&_v=1.0",
          pictureUrl: "https://flutecenter.com/cdn/shop/files/mur_ds_1_a3a51cf4-af06-4ee6-8727-f454daf51120.png?v=1730819002&width=3000",
          type: "Flute"
        },
        {
          brand: "Selmer Paris",
          model: "Selmer Mark VI",
          price: "$8500.00",
          url: "https://www.twiggmusique.com/en/saxophone-alto-selmer-mark-vi-usage-c.html?srsltid=AfmBOoqM3uK2BeWdW5hMpbfu3X3qZWR00pfDq3khZ2Ts4i3aYU1ik6EHbFo",
          pictureUrl: SelmerMarkVI,
          type: "Saxophone"
        },
        {
          brand: "Selmer Paris",
          model: "Selmer Supreme",
          price: "$17995.00",
          url: "https://www.twiggmusique.com/fr/saxophone-tenor-selmer-supreme-brosse.html?source=googlebase&srsltid=AfmBOopvJbmQcQvpdRfGTk6up1KA5kNAvsXYHjB9CelcSUiTmWyRUhIBLG4",
          pictureUrl: SelmerSupreme,
          type: "Saxophone"
        },
        {
          brand: "Selmer Paris",
          model: "Selmer Series III",
          price: "$19499.00",
          url: "https://www.long-mcquade.com/12909/Band/Saxophones/Conn-Selmer-Inc/Series-III-Baritone-Saxophone.htm?srsltid=AfmBOorR5kn5Xun9e1mN8HaW-yPG_F9HcTxO9AKOf4kTh-ILAHBBBux_fYA",
          pictureUrl: SelmerSeriesIII,
          type: "Saxophone"
        },
        {
          brand: "Yamaha",
          model: "Yamaha YAS-62",
          price: "$4180.00",
          url: "https://www.tapestrymusic.com/p-24-yamaha-yas62iii-alto-saxophone.aspx?gad_source=4&gclid=Cj0KCQiAz6q-BhCfARIsAOezPxlyHExalN8X3GCtYvhDTNz5n45cHokMXDyre-MCkepx4yR6T3gmysYaAquLEALw_wcB",
          pictureUrl: Yamaha62,
          type: "Saxophone"
        },
        {
          brand: "Yamaha",
          model: "Yamaha YTS-875EX",
          price: "$6929.00",
          url: "https://www.tomleemusic.ca/yamaha-yts875ex-custom-ex-professional-tenor-saxophone-lacquered-129623?srsltid=AfmBOopPd02WMAoN4aPhI_HnUn8t4fkBaF-PHpjif1cnubJulitItGMvQgs",
          pictureUrl: Yamaha875EX,
          type: "Saxophone"
        },
        {
          brand: "Yamaha",
          model: "Yamaha YAS-82Z",
          price: "$6599.00",
          url: "https://www.tomleemusic.ca/yamaha-yas82zsii-custom-z-professional-alto-saxophone-silver-plated-164791?srsltid=AfmBOor-tACBwkDs4giX6EGdKSnLA5qq61ODnA03M-04f64Vru_5CPffATo",
          pictureUrl: Yamaha82Z,
          type: "Saxophone"
        },
        {
          brand: "Yanagisawa",
          model: "Yanagisawa AWO20",
          price: "$6125.00",
          url: "https://www.tomleemusic.ca/yanagisawa-wo-series-professional-alto-saxophone-all-bronze-171756?srsltid=AfmBOoo1xUa4iLwQfYb3AKQDyB939qGzQO3AAS5PXeAEiZJD-g80WqypPeg",
          pictureUrl: YanagisawaAWO20,
          type: "Saxophone"
        },
        {
          brand: "Yanagisawa",
          model: "Yanagisawa T-WO2",
          price: "$7595.00",
          url: "https://www.twiggmusique.com/fr/saxophone-tenor-yanagisawa-two2.html?source=googlebase&srsltid=AfmBOooEfapl2GwQQHmNB5Q43n8w1H2sq8Wqif0ZDhedqUpR89D1cD5b6-U",
          pictureUrl: YanagisawaTWO2,
          type: "Saxophone"
        },
        {
          brand: "Yanagisawa",
          model: "Yanagisawa S-WO10",
          price: "$7999.00",
          url: "https://www.tomleemusic.ca/yanagisawa-swo10-elite-model-straight-2pc-body-soprano-saxophone-lacquered-215505?srsltid=AfmBOoq-6AKkvV2uAOmb6z5-j48XBCuiEy6Y21vWUACJOR4qGnFUEGnlkcM",
          pictureUrl: YanagisawaSWO10,
          type: "Saxophone"
        },
        {
          brand: "Keilwerth",
          model: "Keilwerth SX90R",
          price: "$7692.99",
          url: "https://reverb.com/ca/p/keilwerth-jk2401-5b2-sx90r-shadow-vintage-alto-saxophone?hfid=86659203&utm_campaign=INTL-CA-Shop_unpaid&utm_medium=cpc&utm_source=google",
          pictureUrl: KeilwerthSX90R,
          type: "Saxophone"
        },
        {
          brand: "Keilwerth",
          model: "Keilwerth Shadow",
          price: "$7692.83",
          url: "https://reverb.com/ca/p/keilwerth-jk2401-5b2-sx90r-shadow-vintage-alto-saxophone?hfid=86659203&utm_campaign=INTL-CA-Shop_unpaid&utm_medium=cpc&utm_source=google",
          pictureUrl: KeilwerthShadow,
          type: "Saxophone"
        },
        {
          brand: "Keilwerth",
          model: "Keilwerth SX90",
          price: "$9999.00",
          url: "https://www.coachhousepianos.co.uk/product/new-bosendorfer-185-vc-grand-piano/?srsltid=AfmBOooUnC8SQ1vi4xkOCD_qdNSD0e1IoGuMuFANps-y7spkaR6ciXXRC-I",
          pictureUrl: KeilwerthSX90,
          type: "Saxophone"
        },
        {
          brand: "P. Mauriat",
          model: "P. Mauriat PMXA-67R ",
          price: "$4699.00",
          url: "https://www.long-mcquade.com/10850/Band/Saxophones/P-Mauriat/PMXA-67R-DK-Alto-Sax-Rolled-Tone-Hole-Dark-Lacquer.htm?srsltid=AfmBOooUTDYfgJWckFRw_OhiPRyUKQeVJM0uajfxo3D4zf9yYe938x1yecI",
          pictureUrl: MauriatPMXA67R,
          type: "Saxophone"
        },
        {
          brand: "P. Mauriat",
          model: "P. Mauriat System 76",
          price: "$5695.00",
          url: "https://www.twiggmusique.com/fr/saxophone-tenor-p-mauriat-system-76.html?srsltid=AfmBOoqyGTPuoPqIqLsaMa-c8LJBLPw5HlxNWquz9Crz-vNmViGusVQs3BM",
          pictureUrl: MauriatSystem76,
          type: "Saxophone"
        },
        {
          brand: "P. Mauriat",
          model: "P. Mauriat Le Bravo 200",
          price: "$3725.00",
          url: "https://www.twiggmusique.com/en/saxophone-tenor-p-mauriat-bravo-200.html?srsltid=AfmBOoryiw0QYu_Fg_J8nWrzm6R5HaESaCOIAlSo7XgNnnFoF9PjIECZflw",
          pictureUrl: MauriatBravo200,
          type: "Saxophone"
        }
      ],
    };
  },
  computed: {
    instrumentTypes() {
      return [...new Set(this.instruments.map(item => item.type))];
    },
    filteredInstruments() {
      if (!this.selectedInstrument) return this.instruments;
      return this.instruments.filter(item => item.type === this.selectedInstrument);
    },
  },
  methods: {
    filterInstruments() {
      console.log("Filtering by:", this.selectedInstrument);
    }
  }
};
</script>

<style scoped>
/* Custom styling for store page */
</style>
