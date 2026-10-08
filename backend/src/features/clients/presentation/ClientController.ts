import { Request, Response } from 'express';
import { CreateClientUseCase } from '../application/CreateClientUseCase.js';
import { GetClientsUseCase } from '../application/GetClientsUseCase.js';
import { GetClientByIdUseCase } from '../application/GetClientByIdUseCase.js';
import { UpdateClientUseCase } from '../application/UpdateClientUseCase.js';
import { DeleteClientUseCase } from '../application/DeleteClientUseCase.js';

export class ClientController {
  constructor(
    private readonly createClientUseCase: CreateClientUseCase,
    private readonly getClientsUseCase: GetClientsUseCase,
    private readonly getClientByIdUseCase: GetClientByIdUseCase,
    private readonly updateClientUseCase: UpdateClientUseCase,
    private readonly deleteClientUseCase: DeleteClientUseCase
  ) {}

  public createClient = async (req: Request, res: Response): Promise<void> => {
    try {
      const client = await this.createClientUseCase.execute(req.body);
      res.status(201).json({ message: 'Cliente creado exitosamente', data: client });
    } catch (error: any) {
      res.status(400).json({ error: error.message || 'Error procesando la solicitud' });
    }
  };

  public getClients = async (req: Request, res: Response): Promise<void> => {
    try {
      const clients = await this.getClientsUseCase.execute();
      res.status(200).json({ data: clients });
    } catch (error: any) {
      res.status(500).json({ error: error.message || 'Error interno del servidor' });
    }
  };

  public getClientById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id as string;
      const client = await this.getClientByIdUseCase.execute(id);
      if (!client) {
        res.status(404).json({ error: 'Cliente no encontrado' });
        return;
      }
      res.status(200).json({ data: client });
    } catch (error: any) {
      res.status(500).json({ error: error.message || 'Error interno del servidor' });
    }
  };

  public updateClient = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id as string;
      const dto = { ...req.body, id };
      const client = await this.updateClientUseCase.execute(dto);
      res.status(200).json({ message: 'Cliente actualizado', data: client });
    } catch (error: any) {
      res.status(400).json({ error: error.message || 'Error procesando la solicitud' });
    }
  };

  public deleteClient = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id as string;
      await this.deleteClientUseCase.execute(id);
      res.status(200).json({ message: 'Cliente eliminado' });
    } catch (error: any) {
      if (error.message === 'Client not found') {
        res.status(404).json({ error: 'Cliente no encontrado' });
      } else {
        res.status(500).json({ error: error.message || 'Error interno del servidor' });
      }
    }
  };
}
