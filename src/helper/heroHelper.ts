import { Hero } from "../model/index";
import { IHero, IHeroResponse } from "../interface";
import { removeReplacedFile } from "../utils/shortcuts";

export const getHero = async (): Promise<IHeroResponse> => {
    try {
        const hero = await Hero.findOne(
            {},
            {
                title: 1,
                leftCardImage: 1,
                heroImage: 1,
                rightCardImage: 1,
                subtitle: 1,
                createdAt: 1,
                totalUsers: 1,
                ios: 1,
                android: 1,
            }
        );

        if (!hero) throw { message: "Hero not found", statusCode: 404 };

        return {
            message: `Hero fetched successfully`,
            success: true,
            result: hero,
        };
    } catch (error: any) {
        console.log(error);
        throw {
            message: error.message || "Hero fetching failed",
            statusCode: error.statusCode || 500,
            success: false,
        };
    }
};

export const addHero = async (newHero: IHero): Promise<IHeroResponse> => {
    try {
        if (
            !newHero.title ||
            !newHero.subtitle ||
            !newHero.heroImage ||
            !newHero.leftCardImage ||
            !newHero.rightCardImage ||
            !newHero.totalUsers ||
            !newHero.ios ||
            !newHero.android
        ) {
            throw { message: "Missing fields", statusCode: 400 };
        }

        const hero = new Hero({
            title: newHero.title,
            subtitle: newHero.subtitle,
            heroImage: newHero.heroImage,
            leftCardImage: newHero.leftCardImage,
            rightCardImage: newHero.rightCardImage,
            totalUsers: newHero.totalUsers,
            ios: newHero.ios,
            android: newHero.android,
        });
        const editedHero = await hero.save();

        return {
            message: `Hero created successfully`,
            success: true,
            result: editedHero,
        };
    } catch (error: any) {
        console.log(error);
        throw {
            message: error.message || "Hero creation failed",
            statusCode: error.statusCode || 500,
            success: false,
        };
    }
};

export const editHero = async (newHero: IHero): Promise<IHeroResponse> => {
    try {
        const hero = await Hero.findOne(
            {},
            {
                title: 1,
                leftCardImage: 1,
                heroImage: 1,
                rightCardImage: 1,
                subtitle: 1,
                totalUsers: 1,
                ios: 1,
                android: 1,
            }
        );

        let result;

        if (!hero) {
            result = (await addHero(newHero)).result;
        } else {
            const { title, subtitle, rightCardImage, leftCardImage, heroImage, totalUsers, android, ios } = newHero;

            const oldHeroImage = hero.heroImage;
            const oldRightCardImage = hero.rightCardImage;
            const oldLeftCardImage = hero.leftCardImage;

            hero.title = title || hero.title;
            hero.subtitle = subtitle || hero.subtitle;
            hero.heroImage = heroImage || hero.heroImage;
            hero.rightCardImage = rightCardImage || hero.rightCardImage;
            hero.leftCardImage = leftCardImage || hero.leftCardImage;
            hero.totalUsers = totalUsers || hero.totalUsers;
            hero.ios = ios || hero.ios;
            hero.android = android || hero.android;

            removeReplacedFile("heros", oldHeroImage, heroImage);
            removeReplacedFile("heros", oldLeftCardImage, leftCardImage);
            removeReplacedFile("heros", oldRightCardImage, rightCardImage);

            const editedHero = await hero.save();
            result = editedHero;
        }

        return {
            message: `Hero edited successfully`,
            success: true,
            result,
        };
    } catch (error: any) {
        console.log(error);
        throw {
            message: error.message || "Hero editing failed",
            statusCode: error.statusCode || 500,
            success: false,
        };
    }
};
