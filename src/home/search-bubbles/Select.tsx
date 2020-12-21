import React from "react";

//TODO: get options from API
export const RescuesSelect = () => {
    return (
        <>
            <label className="lpdir-select-label" htmlFor="lpdir-select-orgsandrescues_listing">Select
                a Category:</label>
            <select name="category"
                    id="lpdir-select-orgsandrescues_listing"
                    className="lpdir-select lpdir-select-orgsandrescues_listing">
                <option value="">Cats and Dogs</option>
                <option value="314">Cats</option>
                <option value="46">Dogs</option>
                <optgroup label="Breed Rescues">
                    <option value="48" className="lpdir-option lpdir-option-48">Affenpinscher
                    </option>
                    <option value="49" className="lpdir-option lpdir-option-49">Afghan Hound
                    </option>
                    <option value="50" className="lpdir-option lpdir-option-50">Airedale Terrier
                    </option>
                    <option value="321" className="lpdir-option lpdir-option-321">Akbash Dog
                    </option>
                    <option value="51" className="lpdir-option lpdir-option-51">Akita</option>
                    <option value="483" className="lpdir-option lpdir-option-483">Alaskan Klee Kai
                    </option>
                    <option value="52" className="lpdir-option lpdir-option-52">Alaskan Malamute
                    </option>
                    <option value="405" className="lpdir-option lpdir-option-405">American Bulldog
                    </option>
                    <option value="476" className="lpdir-option lpdir-option-476">American English
                        Coonhound
                    </option>
                    <option value="53" className="lpdir-option lpdir-option-53">American Eskimo
                        Dog
                    </option>
                    <option value="55" className="lpdir-option lpdir-option-55">American Hairless
                        Terrier
                    </option>
                    <option value="484" className="lpdir-option lpdir-option-484">American Lurcher
                    </option>
                    <option value="475" className="lpdir-option lpdir-option-475">American Pit Bull
                        Terrier
                    </option>
                    <option value="472" className="lpdir-option lpdir-option-472">American
                        Staffordshire Terrier
                    </option>
                    <option value="58" className="lpdir-option lpdir-option-58">American Water
                        Spaniel
                    </option>
                    <option value="59" className="lpdir-option lpdir-option-59">Anatolian Shepherd
                        Dog
                    </option>
                    <option value="60" className="lpdir-option lpdir-option-60">Appenzeller Mountain
                        Dog
                    </option>
                    <option value="61" className="lpdir-option lpdir-option-61">Australian Cattle
                        Dog
                    </option>
                    <option value="62" className="lpdir-option lpdir-option-62">Australian
                        Shepherd
                    </option>
                    <option value="63" className="lpdir-option lpdir-option-63">Australian Terrier
                    </option>
                    <option value="322" className="lpdir-option lpdir-option-322">Azawakh</option>
                    <option value="64" className="lpdir-option lpdir-option-64">Barbet</option>
                    <option value="65" className="lpdir-option lpdir-option-65">Basenji</option>
                    <option value="66" className="lpdir-option lpdir-option-66">Basset Hound
                    </option>
                    <option value="67" className="lpdir-option lpdir-option-67">Beagle</option>
                    <option value="68" className="lpdir-option lpdir-option-68">Bearded Collie
                    </option>
                    <option value="69" className="lpdir-option lpdir-option-69">Beauceron Shepherd
                    </option>
                    <option value="70" className="lpdir-option lpdir-option-70">Bedlington Terrier
                    </option>
                    <option value="71" className="lpdir-option lpdir-option-71">Belgian Malinois
                    </option>
                    <option value="72" className="lpdir-option lpdir-option-72">Belgian Shepherd
                        [Groenendael]
                    </option>
                    <option value="73" className="lpdir-option lpdir-option-73">Belgian Tervuren
                    </option>
                    <option value="74" className="lpdir-option lpdir-option-74">Berger Picard
                    </option>
                    <option value="75" className="lpdir-option lpdir-option-75">Bernese Mountain
                        Dog
                    </option>
                    <option value="76" className="lpdir-option lpdir-option-76">Bichon Frise
                    </option>
                    <option value="77" className="lpdir-option lpdir-option-77">Black and Tan
                        Coonhound
                    </option>
                    <option value="78" className="lpdir-option lpdir-option-78">Black Russian
                        Terrier
                    </option>
                    <option value="79" className="lpdir-option lpdir-option-79">Bloodhound</option>
                    <option value="207" className="lpdir-option lpdir-option-207">Bluetick
                        Coonhound
                    </option>
                    <option value="490" className="lpdir-option lpdir-option-490">Boerboel Mastiff
                    </option>
                    <option value="82" className="lpdir-option lpdir-option-82">Bolognese</option>
                    <option value="83" className="lpdir-option lpdir-option-83">Border Collie
                    </option>
                    <option value="84" className="lpdir-option lpdir-option-84">Border Terrier
                    </option>
                    <option value="85" className="lpdir-option lpdir-option-85">Borzoi</option>
                    <option value="86" className="lpdir-option lpdir-option-86">Boston Terrier
                    </option>
                    <option value="87" className="lpdir-option lpdir-option-87">Bouvier des
                        Flandres
                    </option>
                    <option value="88" className="lpdir-option lpdir-option-88">Boxer</option>
                    <option value="285" className="lpdir-option lpdir-option-285">Boykin Spaniel
                    </option>
                    <option value="286" className="lpdir-option lpdir-option-286">Briard</option>
                    <option value="89" className="lpdir-option lpdir-option-89">Brittany Spaniel
                    </option>
                    <option value="90" className="lpdir-option lpdir-option-90">Brussels Griffon
                    </option>
                    <option value="91" className="lpdir-option lpdir-option-91">Bull Terrier
                    </option>
                    <option value="93" className="lpdir-option lpdir-option-93">Bullmastiff</option>
                    <option value="94" className="lpdir-option lpdir-option-94">Cairn Terrier
                    </option>
                    <option value="95" className="lpdir-option lpdir-option-95">Canaan Dog</option>
                    <option value="96" className="lpdir-option lpdir-option-96">Cane Corso
                        Italiano
                    </option>
                    <option value="487" className="lpdir-option lpdir-option-487">Cane Corso
                        Mastiff
                    </option>
                    <option value="97" className="lpdir-option lpdir-option-97">Cardigan Welsh
                        Corgi
                    </option>
                    <option value="98" className="lpdir-option lpdir-option-98">Catahoula Leopard
                        Dog
                    </option>
                    <option value="99" className="lpdir-option lpdir-option-99">Cavalier King
                        Charles Spaniel
                    </option>
                    <option value="100" className="lpdir-option lpdir-option-100">Cesky Terrier
                    </option>
                    <option value="101" className="lpdir-option lpdir-option-101">Chesapeake Bay
                        Retriever
                    </option>
                    <option value="102" className="lpdir-option lpdir-option-102">Chihuahua</option>
                    <option value="103" className="lpdir-option lpdir-option-103">Chinese Crested
                        Dog
                    </option>
                    <option value="215" className="lpdir-option lpdir-option-215">Chinese Shar-Pei
                    </option>
                    <option value="104" className="lpdir-option lpdir-option-104">Chinook</option>
                    <option value="105" className="lpdir-option lpdir-option-105">Chow Chow</option>
                    <option value="478" className="lpdir-option lpdir-option-478">Cirneco
                        dell'Etna
                    </option>
                    <option value="106" className="lpdir-option lpdir-option-106">Clumber Spaniel
                    </option>
                    <option value="108" className="lpdir-option lpdir-option-108">Cocker Spaniel,
                        American
                    </option>
                    <option value="109" className="lpdir-option lpdir-option-109">Cocker Spaniel,
                        English
                    </option>
                    <option value="110" className="lpdir-option lpdir-option-110">Collie</option>
                    <option value="81" className="lpdir-option lpdir-option-81">Coonhound</option>
                    <option value="112" className="lpdir-option lpdir-option-112">Coton de Tulear
                    </option>
                    <option value="113" className="lpdir-option lpdir-option-113">Curly-Coated
                        Retriever
                    </option>
                    <option value="114" className="lpdir-option lpdir-option-114">Dachshund</option>
                    <option value="115" className="lpdir-option lpdir-option-115">Dalmatian</option>
                    <option value="116" className="lpdir-option lpdir-option-116">Dandie Dinmont
                        Terrier
                    </option>
                    <option value="117" className="lpdir-option lpdir-option-117">Doberman
                        Pinscher
                    </option>
                    <option value="491" className="lpdir-option lpdir-option-491">Dogo Argentino
                    </option>
                    <option value="118" className="lpdir-option lpdir-option-118">Dogue de
                        Bordeaux
                    </option>
                    <option value="119" className="lpdir-option lpdir-option-119">English Bulldog
                    </option>
                    <option value="489" className="lpdir-option lpdir-option-489">English Pointer
                    </option>
                    <option value="121" className="lpdir-option lpdir-option-121">English Setter
                    </option>
                    <option value="227" className="lpdir-option lpdir-option-227">English Springer
                        Spaniel
                    </option>
                    <option value="123" className="lpdir-option lpdir-option-123">English Toy
                        Spaniel
                    </option>
                    <option value="124" className="lpdir-option lpdir-option-124">Entlebucher
                        Mountain Dog
                    </option>
                    <option value="524" className="lpdir-option lpdir-option-524">Eskimo Dog,
                        American
                    </option>
                    <option value="125" className="lpdir-option lpdir-option-125">Field Spaniel
                    </option>
                    <option value="126" className="lpdir-option lpdir-option-126">Finnish Lapphund
                    </option>
                    <option value="127" className="lpdir-option lpdir-option-127">Finnish Spitz
                    </option>
                    <option value="128" className="lpdir-option lpdir-option-128">Flat-Coated
                        Retriever
                    </option>
                    <option value="504" className="lpdir-option lpdir-option-504">Fox Terrier
                    </option>
                    <option value="131" className="lpdir-option lpdir-option-131">Foxhound,
                        American
                    </option>
                    <option value="132" className="lpdir-option lpdir-option-132">Foxhound,
                        English
                    </option>
                    <option value="133" className="lpdir-option lpdir-option-133">French Bulldog
                    </option>
                    <option value="134" className="lpdir-option lpdir-option-134">German Pinscher
                    </option>
                    <option value="135" className="lpdir-option lpdir-option-135">German Shepherd
                    </option>
                    <option value="408" className="lpdir-option lpdir-option-408">German Shepherd,
                        White
                    </option>
                    <option value="136" className="lpdir-option lpdir-option-136">German Shorthaired
                        Pointer
                    </option>
                    <option value="137" className="lpdir-option lpdir-option-137">German Wirehaired
                        Pointer
                    </option>
                    <option value="138" className="lpdir-option lpdir-option-138">Giant Schnauzer
                    </option>
                    <option value="139" className="lpdir-option lpdir-option-139">Glen of Imaal
                        Terrier
                    </option>
                    <option value="141" className="lpdir-option lpdir-option-141">Golden Retriever
                    </option>
                    <option value="444" className="lpdir-option lpdir-option-444">Goldendoodle
                    </option>
                    <option value="143" className="lpdir-option lpdir-option-143">Gordon Setter
                    </option>
                    <option value="144" className="lpdir-option lpdir-option-144">Great Dane
                    </option>
                    <option value="145" className="lpdir-option lpdir-option-145">Great Pyrenees
                    </option>
                    <option value="146" className="lpdir-option lpdir-option-146">Greater Swiss
                        Mountain Dog
                    </option>
                    <option value="147" className="lpdir-option lpdir-option-147">Greyhound</option>
                    <option value="148" className="lpdir-option lpdir-option-148">Groenendael
                        [Belgian Shepherd]
                    </option>
                    <option value="149" className="lpdir-option lpdir-option-149">Hairless Terrier,
                        American
                    </option>
                    <option value="150" className="lpdir-option lpdir-option-150">Harrier</option>
                    <option value="151" className="lpdir-option lpdir-option-151">Havanese</option>
                    <option value="152" className="lpdir-option lpdir-option-152">Ibizan Hound
                    </option>
                    <option value="153" className="lpdir-option lpdir-option-153">Icelandic
                        Sheepdog
                    </option>
                    <option value="154" className="lpdir-option lpdir-option-154">Irish
                        Red &amp; White Setter
                    </option>
                    <option value="156" className="lpdir-option lpdir-option-156">Irish Terrier
                    </option>
                    <option value="157" className="lpdir-option lpdir-option-157">Irish Water
                        Spaniel
                    </option>
                    <option value="158" className="lpdir-option lpdir-option-158">Irish Wolfhound
                    </option>
                    <option value="159" className="lpdir-option lpdir-option-159">Italian
                        Greyhound
                    </option>
                    <option value="160" className="lpdir-option lpdir-option-160">Italiano Spinone
                    </option>
                    <option value="161" className="lpdir-option lpdir-option-161">Jack Russell
                        Terrier
                    </option>
                    <option value="162" className="lpdir-option lpdir-option-162">Japanese Chin
                        Spaniel
                    </option>
                    <option value="163" className="lpdir-option lpdir-option-163">Keeshond</option>
                    <option value="164" className="lpdir-option lpdir-option-164">Kerry Blue
                        Terrier
                    </option>
                    <option value="323" className="lpdir-option lpdir-option-323">King Charles
                        Spaniel
                    </option>
                    <option value="166" className="lpdir-option lpdir-option-166">Komondor</option>
                    <option value="167" className="lpdir-option lpdir-option-167">Kooikerhondje
                    </option>
                    <option value="168" className="lpdir-option lpdir-option-168">Kuvasz</option>
                    <option value="445" className="lpdir-option lpdir-option-445">Labradoodle
                    </option>
                    <option value="170" className="lpdir-option lpdir-option-170">Labrador
                        Retriever
                    </option>
                    <option value="171" className="lpdir-option lpdir-option-171">Lakeland Terrier
                    </option>
                    <option value="186" className="lpdir-option lpdir-option-186">Large
                        Munsterlander
                    </option>
                    <option value="173" className="lpdir-option lpdir-option-173">Leonberger
                    </option>
                    <option value="174" className="lpdir-option lpdir-option-174">Lhasa Apso
                    </option>
                    <option value="175" className="lpdir-option lpdir-option-175">Lowchen, "The Lion
                        Dog"
                    </option>
                    <option value="358" className="lpdir-option lpdir-option-358">Malinois,
                        Belgian
                    </option>
                    <option value="176" className="lpdir-option lpdir-option-176">Maltese</option>
                    <option value="179" className="lpdir-option lpdir-option-179">Manchester
                        Terrier
                    </option>
                    <option value="180" className="lpdir-option lpdir-option-180">Mastiff</option>
                    <option value="492" className="lpdir-option lpdir-option-492">Mastiff, English
                    </option>
                    <option value="493" className="lpdir-option lpdir-option-493">Mastiff, French
                    </option>
                    <option value="494" className="lpdir-option lpdir-option-494">Mastiff, Italian
                    </option>
                    <option value="181" className="lpdir-option lpdir-option-181">Mexican Hairless
                        [Xoloitzcuintli]
                    </option>
                    <option value="441" className="lpdir-option lpdir-option-441">Miniature American
                        Shepherd
                    </option>
                    <option value="442" className="lpdir-option lpdir-option-442">Miniature
                        Australian Shepherd
                    </option>
                    <option value="182" className="lpdir-option lpdir-option-182">Miniature Bull
                        Terrier
                    </option>
                    <option value="183" className="lpdir-option lpdir-option-183">Miniature
                        Pinscher
                    </option>
                    <option value="185" className="lpdir-option lpdir-option-185">Miniature
                        Schnauzer
                    </option>
                    <option value="187" className="lpdir-option lpdir-option-187">Neapolitan
                        Mastiff
                    </option>
                    <option value="188" className="lpdir-option lpdir-option-188">Newfoundland
                    </option>
                    <option value="189" className="lpdir-option lpdir-option-189">Norfolk Terrier
                    </option>
                    <option value="190" className="lpdir-option lpdir-option-190">Norwegian Buhund
                    </option>
                    <option value="191" className="lpdir-option lpdir-option-191">Norwegian
                        Elkhound
                    </option>
                    <option value="193" className="lpdir-option lpdir-option-193">Norwich Terrier
                    </option>
                    <option value="194" className="lpdir-option lpdir-option-194">Nova Scotia Duck
                        Tolling Retriever
                    </option>
                    <option value="195" className="lpdir-option lpdir-option-195">Old English
                        Sheepdog
                    </option>
                    <option value="196" className="lpdir-option lpdir-option-196">Otterhound
                    </option>
                    <option value="197" className="lpdir-option lpdir-option-197">Papillon</option>
                    <option value="198" className="lpdir-option lpdir-option-198">Parson Russell
                        Terrier
                    </option>
                    <option value="200" className="lpdir-option lpdir-option-200">Pekingese</option>
                    <option value="201" className="lpdir-option lpdir-option-201">Pembroke Welsh
                        Corgi
                    </option>
                    <option value="203" className="lpdir-option lpdir-option-203">Petit Basset
                        Griffon Vendeen
                    </option>
                    <option value="204" className="lpdir-option lpdir-option-204">Pharaoh Hound
                    </option>
                    <option value="278" className="lpdir-option lpdir-option-278">Pit Bull Terrier
                    </option>
                    <option value="206" className="lpdir-option lpdir-option-206">Plott Hound
                    </option>
                    <option value="208" className="lpdir-option lpdir-option-208">Pointer</option>
                    <option value="210" className="lpdir-option lpdir-option-210">Polish Lowland
                        Sheepdog
                    </option>
                    <option value="211" className="lpdir-option lpdir-option-211">Pomeranian
                    </option>
                    <option value="184" className="lpdir-option lpdir-option-184">Poodle,
                        Miniature
                    </option>
                    <option value="247" className="lpdir-option lpdir-option-247">Poodle, Standard
                    </option>
                    <option value="256" className="lpdir-option lpdir-option-256">Poodle, Toy
                    </option>
                    <option value="481" className="lpdir-option lpdir-option-481">Portuguese Podengo
                        Pequeno
                    </option>
                    <option value="213" className="lpdir-option lpdir-option-213">Portuguese Water
                        Dog
                    </option>
                    <option value="488" className="lpdir-option lpdir-option-488">Presa Canario
                    </option>
                    <option value="214" className="lpdir-option lpdir-option-214">Pug</option>
                    <option value="216" className="lpdir-option lpdir-option-216">Puli</option>
                    <option value="217" className="lpdir-option lpdir-option-217">Pyrenean
                        Sheepdog
                    </option>
                    <option value="218" className="lpdir-option lpdir-option-218">Rat Terrier
                    </option>
                    <option value="219" className="lpdir-option lpdir-option-219">Redbone
                        Coonhound
                    </option>
                    <option value="220" className="lpdir-option lpdir-option-220">Rhodesian
                        Ridgeback
                    </option>
                    <option value="221" className="lpdir-option lpdir-option-221">Rottweiler
                    </option>
                    <option value="222" className="lpdir-option lpdir-option-222">Saint Bernard
                    </option>
                    <option value="223" className="lpdir-option lpdir-option-223">Saluki</option>
                    <option value="225" className="lpdir-option lpdir-option-225">Samoyed</option>
                    <option value="226" className="lpdir-option lpdir-option-226">Schipperke
                    </option>
                    <option value="229" className="lpdir-option lpdir-option-229">Scottish
                        Deerhound
                    </option>
                    <option value="230" className="lpdir-option lpdir-option-230">Scottish Terrier
                    </option>
                    <option value="231" className="lpdir-option lpdir-option-231">Sealyham Terrier
                    </option>
                    <option value="232" className="lpdir-option lpdir-option-232">Shar-Pei,
                        Chinese
                    </option>
                    <option value="234" className="lpdir-option lpdir-option-234">Shetland
                        Sheepdog
                    </option>
                    <option value="235" className="lpdir-option lpdir-option-235">Shiba Inu</option>
                    <option value="236" className="lpdir-option lpdir-option-236">Shih Tzu</option>
                    <option value="237" className="lpdir-option lpdir-option-237">Siberian Husky
                    </option>
                    <option value="238" className="lpdir-option lpdir-option-238">Silky Terrier
                    </option>
                    <option value="239" className="lpdir-option lpdir-option-239">Skye Terrier
                    </option>
                    <option value="240" className="lpdir-option lpdir-option-240">Sloughi</option>
                    <option value="129" className="lpdir-option lpdir-option-129">Smooth Fox
                        Terrier
                    </option>
                    <option value="241" className="lpdir-option lpdir-option-241">Soft Coated
                        Wheaten Terrier
                    </option>
                    <option value="243" className="lpdir-option lpdir-option-243">Spinone Italiano
                    </option>
                    <option value="122" className="lpdir-option lpdir-option-122">Springer Spaniel,
                        English
                    </option>
                    <option value="244" className="lpdir-option lpdir-option-244">Stabyhoun</option>
                    <option value="245" className="lpdir-option lpdir-option-245">Staffordshire Bull
                        Terrier
                    </option>
                    <option value="248" className="lpdir-option lpdir-option-248">Standard
                        Schnauzer
                    </option>
                    <option value="249" className="lpdir-option lpdir-option-249">Sussex Spaniel
                    </option>
                    <option value="250" className="lpdir-option lpdir-option-250">Swedish Vallhund
                    </option>
                    <option value="352" className="lpdir-option lpdir-option-352">Tervuren,
                        Belgian
                    </option>
                    <option value="510" className="lpdir-option lpdir-option-510">Thai Ridgeback
                    </option>
                    <option value="251" className="lpdir-option lpdir-option-251">Tibetan Mastiff
                    </option>
                    <option value="252" className="lpdir-option lpdir-option-252">Tibetan Spaniel
                    </option>
                    <option value="253" className="lpdir-option lpdir-option-253">Tibetan Terrier
                    </option>
                    <option value="254" className="lpdir-option lpdir-option-254">Toy Fox Terrier
                    </option>
                    <option value="257" className="lpdir-option lpdir-option-257">Treeing Tennessee
                        Brindle
                    </option>
                    <option value="258" className="lpdir-option lpdir-option-258">Treeing Walker
                        Coonhound
                    </option>
                    <option value="259" className="lpdir-option lpdir-option-259">Vizsla</option>
                    <option value="260" className="lpdir-option lpdir-option-260">Weimaraner
                    </option>
                    <option value="261" className="lpdir-option lpdir-option-261">Welsh Springer
                        Spaniel
                    </option>
                    <option value="262" className="lpdir-option lpdir-option-262">Welsh Terrier
                    </option>
                    <option value="263" className="lpdir-option lpdir-option-263">West Highland
                        White Terrier
                    </option>
                    <option value="264" className="lpdir-option lpdir-option-264">Whippet</option>
                    <option value="265" className="lpdir-option lpdir-option-265">White German
                        Shepherd
                    </option>
                    <option value="459" className="lpdir-option lpdir-option-459">White Great Dane
                    </option>
                    <option value="266" className="lpdir-option lpdir-option-266">Wire Fox Terrier
                    </option>
                    <option value="267" className="lpdir-option lpdir-option-267">Wirehaired
                        Pointing Griffon
                    </option>
                    <option value="409" className="lpdir-option lpdir-option-409">Wirehaired
                        Vizsla
                    </option>
                    <option value="268" className="lpdir-option lpdir-option-268">Xoloitzcuintli
                        [Mexican Hairless]
                    </option>
                    <option value="270" className="lpdir-option lpdir-option-270">Yorkshire
                        Terrier
                    </option>
                </optgroup>
            </select>
        </>
    )
}
export const ServicesSelect = () => {
    return (
        <>
            <label className="lpdir-select-label" htmlFor="lpdir-select-petsevices_listing">Select
                a Category:</label>
            <select name="category" id="lpdir-select-petsevices_listing"
                    className="lpdir-select lpdir-select-petsevices_listing">
                <option value="">Select Category</option>
                <option value="22" className="lpdir-option lpdir-option-22">24/7 Emergency Vets
                </option>
                <option value="21" className="lpdir-option lpdir-option-21">Animal Control</option>
                <option value="401" className="lpdir-option lpdir-option-401">BnB &amp; Vacation
                    Homes
                </option>
                <option value="36" className="lpdir-option lpdir-option-36">Boarding / Kennels
                </option>
                <option value="400" className="lpdir-option lpdir-option-400">Dog Friendly Beaches
                </option>
                <option value="40" className="lpdir-option lpdir-option-40">Dog Parks</option>
                <option value="25" className="lpdir-option lpdir-option-25">Dog Trainers</option>
                <option value="26" className="lpdir-option lpdir-option-26">Dog Walkers</option>
                <option value="27" className="lpdir-option lpdir-option-27">Groomers</option>
                <option value="39" className="lpdir-option lpdir-option-39">Low Cost Spay / Neuter
                </option>
                <option value="271" className="lpdir-option lpdir-option-271">Miscellaneous Pet
                    Services
                </option>
                <option value="272" className="lpdir-option lpdir-option-272">Pet Cemeteries
                </option>
                <option value="28" className="lpdir-option lpdir-option-28">Pet Day Care</option>
                <option value="29" className="lpdir-option lpdir-option-29">Pet Friendly Hotels
                </option>
                <option value="30" className="lpdir-option lpdir-option-30">Pet Sitters</option>
                <option value="32" className="lpdir-option lpdir-option-32">Pet Stores/Retailers
                </option>
                <option value="31" className="lpdir-option lpdir-option-31">Pet Transportation
                </option>
                <option value="34" className="lpdir-option lpdir-option-34">Veterinarians</option>
            </select>
        </>
    )
}
