import { Feature } from "../model/index";
import { IFeature, IFeatureResponse } from "../interface";
import { removeReplacedFile } from "../utils/shortcuts";

export const getFeature = async (): Promise<IFeatureResponse> => {
    try {
        const feature = await Feature.findOne(
            {},
            {
                title: 1,
                image: 1,
                subtitle: 1,
                createdAt: 1,
                totalUsers: 1,
                description: 1,
            }
        );

        if (!feature) throw { message: "Feature not found", statusCode: 404 };

        return {
            message: `Feature fetched successfully`,
            success: true,
            result: feature,
        };
    } catch (error: any) {
        console.log(error);
        throw {
            message: error.message || "Feature fetching failed",
            statusCode: error.statusCode || 500,
            success: false,
        };
    }
};

export const addFeature = async (newFeature: IFeature): Promise<IFeatureResponse> => {
    try {
        if (
            !newFeature.title ||
            !newFeature.subtitle ||
            !newFeature.image ||
            !newFeature.description
        ) {
            throw { message: "Missing fields", statusCode: 400 };
        }

        const feature = new Feature({
            title: newFeature.title,
            subtitle: newFeature.subtitle,
            image: newFeature.image,
            description: newFeature.description,
        });
        const editedFeature = await feature.save();

        return {
            message: `Feature created successfully`,
            success: true,
            result: editedFeature,
        };
    } catch (error: any) {
        console.log(error);
        throw {
            message: error.message || "Feature creation failed",
            statusCode: error.statusCode || 500,
            success: false,
        };
    }
};

export const editFeature = async (newFeature: IFeature): Promise<IFeatureResponse> => {
    try {
        const feature = await Feature.findOne(
            {},
            {
                title: 1,
                image: 1,
                subtitle: 1,
                createdAt: 1,
                totalUsers: 1,
                description: 1,
            }
        );

        let result;

        if (!feature) {
            result = (await addFeature(newFeature)).result;
        } else {
            const { title, subtitle, image, description } = newFeature;

            const oldFeatureImage = feature.image;

            feature.title = title || feature.title;
            feature.subtitle = subtitle || feature.subtitle;
            feature.image = image || feature.image;
            feature.description = description || feature.description;

            removeReplacedFile("features", oldFeatureImage, image);

            const editedFeature = await feature.save();
            result = editedFeature;
        }

        return {
            message: `Feature edited successfully`,
            success: true,
            result,
        };
    } catch (error: any) {
        console.log(error);
        throw {
            message: error.message || "Feature editing failed",
            statusCode: error.statusCode || 500,
            success: false,
        };
    }
};
