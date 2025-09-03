import { Request, Response } from 'express';
import { BasicInfo } from '../models/BasicInfo.js';
import { logger } from '../utils/logger.js';

// Получить основные сведения
export const getBasicInfo = async (req: Request, res: Response) => {
  try {
    // Получаем последнюю запись основных сведений
    const basicInfo = await BasicInfo.findOne().sort({ lastUpdated: -1 });
    
    if (!basicInfo) {
      return res.status(404).json({
        status: 'error',
        message: 'Основные сведения не найдены'
      });
    }

    res.status(200).json({
      status: 'success',
      data: basicInfo
    });
  } catch (error) {
    logger.error('Ошибка при получении основных сведений:', error);
    res.status(500).json({
      status: 'error',
      message: 'Внутренняя ошибка сервера'
    });
  }
};

// Обновить основные сведения (только для администраторов)
export const updateBasicInfo = async (req: Request, res: Response) => {
  try {
    const {
      fullName,
      shortName,
      foundedDate,
      legalAddress,
      actualAddress,
      phone,
      email,
      website,
      founder,
      workSchedule,
      branches
    } = req.body;

    // Проверяем права доступа (в реальном приложении будет middleware)
    // if (!req.user || req.user.role !== 'admin') {
    //   return res.status(403).json({
    //     status: 'error',
    //     message: 'Недостаточно прав доступа'
    //   });
    // }

    // Получаем текущую запись или создаем новую
    let basicInfo = await BasicInfo.findOne().sort({ lastUpdated: -1 });
    
    if (basicInfo) {
      // Обновляем существующую запись
      basicInfo.fullName = fullName || basicInfo.fullName;
      basicInfo.shortName = shortName || basicInfo.shortName;
      basicInfo.foundedDate = foundedDate || basicInfo.foundedDate;
      basicInfo.legalAddress = legalAddress || basicInfo.legalAddress;
      basicInfo.actualAddress = actualAddress || basicInfo.actualAddress;
      basicInfo.phone = phone || basicInfo.phone;
      basicInfo.email = email || basicInfo.email;
      basicInfo.website = website || basicInfo.website;
      basicInfo.founder = founder || basicInfo.founder;
      basicInfo.workSchedule = workSchedule || basicInfo.workSchedule;
      basicInfo.branches = branches || basicInfo.branches;
      basicInfo.lastUpdated = new Date();
      basicInfo.updatedBy = 'admin'; // В реальном приложении будет req.user.email
    } else {
      // Создаем новую запись
      basicInfo = new BasicInfo({
        fullName,
        shortName,
        foundedDate,
        legalAddress,
        actualAddress,
        phone,
        email,
        website,
        founder,
        workSchedule,
        branches,
        updatedBy: 'admin'
      });
    }

    await basicInfo.save();

    logger.info('Основные сведения обновлены', {
      id: basicInfo._id,
      updatedBy: basicInfo.updatedBy
    });

    res.status(200).json({
      status: 'success',
      message: 'Основные сведения успешно обновлены',
      data: basicInfo
    });
  } catch (error) {
    logger.error('Ошибка при обновлении основных сведений:', error);
    res.status(500).json({
      status: 'error',
      message: 'Внутренняя ошибка сервера'
    });
  }
};

// Получить историю изменений
export const getBasicInfoHistory = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const history = await BasicInfo.find()
      .sort({ lastUpdated: -1 })
      .skip(skip)
      .limit(limit)
      .select('fullName shortName lastUpdated updatedBy');

    const total = await BasicInfo.countDocuments();

    res.status(200).json({
      status: 'success',
      data: {
        history,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    logger.error('Ошибка при получении истории основных сведений:', error);
    res.status(500).json({
      status: 'error',
      message: 'Внутренняя ошибка сервера'
    });
  }
}; 