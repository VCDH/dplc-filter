# dplc-filter
Filter om dpl.c bestanden op te schonen voordat deze in MobiMaestro ingelezen worden. Doel is om foutieve koppelingen door MobiMaestro te beperken.

## Aanleiding
In MobiMaestro ervaren we de volgende tekortkomingen bij het inlezen van dpl.c-bestanden bij het configureren van een kruispuntplaatje:

1. Vermeldingen in dpl.c die uitgecomment zijn, worden toch door MobiMaestro ingelezen. Comments zouden niet moeten worden ingelezen; het zijn niet voor niks comments in de code en is dus niet aanwezig in de APP.
2. Signaalgroepen (dpl.c) worden gekoppeld aan detectoren (IVERA). Dit zou niet automatisch moeten kunnen plaatsvinden, omdat een signaalgroep een uitgangssignaal is (en als dusdanig opgegeven in dpl.c) en een detector een ingangssignaal. Het lijkt er bovendien op dat de NR_us[] vermelding in dpl.c genegeerd wordt.
3. Ingangssignalen (dpl.c) worden gekoppeld aan signaalgroepen (IVERA). Dit zou niet automatisch moeten kunnen plaatsvinden, omdat een ingangssignaal een ingangssignaal is (en als dusdanig opgegeven in dpl.c) en een signaalgroep een uitgangssignaal.

Bij schrijven van 21 januari 2021 geeft Technolution aan de bovenstaande problemen helaas niet te kunnen oplossen of optimaliseren.

## Enter dplc-filter
Op 22 januari 2021 is dplc-filter gemaakt om de genoemde problemen (gedeeltelijk) te ondervangen.

1. Dit probleem wordt volledig weggenomen. dplc-filter sloopt de comments er uit.
2. Dit probleem wordt gedeeltelijk ondervangen door aanvullende signaalgroepvermeldingen die gebruik maken van de NR_us[] array te verwijderen. Gevolg is dat er per signaalgroep alleen de eerste vlakvulling over blijft, het is aan jou als gebruiker om te bepalen hoe erg je dat vindt.
3. Dit probleem lijkt vooral voor te komen bij koppelsignalen, wanneer deze bijvoorbeeld bij een iVRI niet in de TLC aanwezig zijn. dplc-filter geeft de mogelijkheid om koppelsignalen te verwijderen.

De oplossingen van dplc-filter zijn dus ook niet ideaal, maar het is meer dan niks binnen de beperkingen van MobiMaestro. De laatste twee problemen worden vooral veroorzaakt doordat MobiMaestro ogenschijnlijk niks doet met het onderscheid tussen de X_us/Y_us en X_is/Y_is arrays, maar alles op één hoop lijkt te gooien. Dit is niet iets wat een externe tool als dplc-filter kan ondervangen.

## Licentie
De broncode van dplc-filter is vrijgegeven onder de voorwaarde van de 
GNU General Public License versie 3 of hoger.

    dplc-filter
    Copyright (C) 2021 Gemeente Den Haag, Netherlands
    Developed by Jasper Vries
 
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.
 
    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
 
    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.

## Verkrijgen van de broncode
De broncode van dplc-filter is gepubliceerd op GitHub:
https://github.com/VCDH/dplc-filter/
