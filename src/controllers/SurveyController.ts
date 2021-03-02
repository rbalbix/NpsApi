import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { SurveysRepository } from '../repositories/SurveysRepository';

class SurveyController {
  async create(request: Request, response: Response) {
    const { title, description } = request.body;

    const surveysRepository = getCustomRepository(SurveysRepository);

    // const surveyAlreadyExixts = await surveysRepository.findOne({
    //   title,
    // });

    // if (surveyAlreadyExixts) {
    //   return response.status(400).json({ error: 'Survey already exists!' });
    // }

    const survey = surveysRepository.create({
      title,
      description,
    });

    await surveysRepository.save(survey);

    return response.status(201).send(survey);
  }

  async show(request: Request, response: Response) {
    const surveysRepository = getCustomRepository(SurveysRepository);

    const result = await surveysRepository.find();

    response.status(200).send(result);
  }
}

export { SurveyController };
