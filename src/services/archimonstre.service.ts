import { prisma } from '../configuration/prisma.configuration';
import { STARTS_WITH_ARCHIMONSTRE } from '../constants';
import { ScrapArchimonstre } from '../use-cases/scrap-archimonstre';
import type { Archimonstre } from '../models/archimonstre.model';

interface IArchimonstreService {
  getArchimonstres(): Promise<Archimonstre[]>;
}

export class ArchimonstreService implements IArchimonstreService {
  scrapArchimonstre: ScrapArchimonstre;

  constructor(scrapArchimonstre: ScrapArchimonstre) {
    this.scrapArchimonstre = scrapArchimonstre;
  }

  async getArchimonstres(): Promise<Archimonstre[]> {
    return prisma.archimonstre.findMany({
      where: {
        search: {
          startsWith: STARTS_WITH_ARCHIMONSTRE,
        },
      },
    });
  }

  async getCurrentTotalPrices() {
    const archimonstres = await this.getArchimonstres();
    console.log(archimonstres.length);

    return archimonstres.reduce((acc, item) => acc + Number(item.order), 0);
  }

  async startArchimonstreScrap() {
    await prisma.archimonstre.deleteMany();
    await this.scrapArchimonstre.execute();
  }
}
