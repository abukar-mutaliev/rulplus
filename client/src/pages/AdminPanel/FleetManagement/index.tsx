import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Fab,
  Avatar
} from '@mui/material';
import {
  DirectionsCar,
  Add,
  Edit,
  Delete,
  ArrowBack,
  Save,
  Cancel,
  Build,
  Warning,
  CheckCircle
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

interface Vehicle {
  id: string;
  model: string;
  plateNumber: string;
  year: number;
  category: string;
  status: 'active' | 'maintenance' | 'repair' | 'inactive';
  instructor: string;
  mileage: number;
  lastService: string;
  nextService: string;
  fuelType: string;
  color: string;
}

const FleetManagement = () => {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    model: '',
    plateNumber: '',
    year: new Date().getFullYear(),
    category: '',
    status: 'active' as 'active' | 'maintenance' | 'repair' | 'inactive',
    instructor: '',
    mileage: 0,
    lastService: '',
    nextService: '',
    fuelType: 'Бензин',
    color: ''
  });

  // Моковые данные
  useEffect(() => {
    const mockVehicles: Vehicle[] = [
      {
        id: '1',
        model: 'Lada Granta',
        plateNumber: 'А123ВС99',
        year: 2022,
        category: 'Категория B',
        status: 'active',
        instructor: 'Иванов И.И.',
        mileage: 45000,
        lastService: '2024-01-15',
        nextService: '2024-04-15',
        fuelType: 'Бензин',
        color: 'Белый'
      },
      {
        id: '2',
        model: 'Hyundai Solaris',
        plateNumber: 'В456ЕК99',
        year: 2023,
        category: 'Категория B',
        status: 'active',
        instructor: 'Петрова А.С.',
        mileage: 28000,
        lastService: '2024-01-20',
        nextService: '2024-04-20',
        fuelType: 'Бензин',
        color: 'Серый'
      }
    ];
    setVehicles(mockVehicles);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'maintenance': return 'warning';
      case 'repair': return 'error';
      case 'inactive': return 'default';
      default: return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Активный';
      case 'maintenance': return 'ТО';
      case 'repair': return 'Ремонт';
      case 'inactive': return 'Неактивный';
      default: return status;
    }
  };

  const handleEdit = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setFormData({
      model: vehicle.model,
      plateNumber: vehicle.plateNumber,
      year: vehicle.year,
      category: vehicle.category,
      status: vehicle.status,
      instructor: vehicle.instructor,
      mileage: vehicle.mileage,
      lastService: vehicle.lastService,
      nextService: vehicle.nextService,
      fuelType: vehicle.fuelType,
      color: vehicle.color
    });
    setIsEditDialogOpen(true);
  };

  const handleSave = () => {
    if (selectedVehicle) {
      const updatedVehicles = vehicles.map(v => 
        v.id === selectedVehicle.id ? { ...v, ...formData } : v
      );
      setVehicles(updatedVehicles);
    }
    setIsEditDialogOpen(false);
    setSelectedVehicle(null);
  };

  return (
    <>
      <Helmet>
        <title>Управление автопарком - РУЛЬ+ Админ</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate('/admin')}
            sx={{ mr: 2 }}
          >
            Назад
          </Button>
          <DirectionsCar sx={{ mr: 2, fontSize: 32, color: 'primary.main' }} />
          <Box>
            <Typography variant="h4" component="h1" fontWeight="bold">
              Управление автопарком
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Управление транспортными средствами автошколы
            </Typography>
          </Box>
        </Box>

        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Транспортное средство</TableCell>
                  <TableCell>Категория</TableCell>
                  <TableCell>Инструктор</TableCell>
                  <TableCell>Статус</TableCell>
                  <TableCell align="center">Действия</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {vehicles.map((vehicle) => (
                  <TableRow key={vehicle.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                          <DirectionsCar />
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle2" fontWeight="medium">
                            {vehicle.model}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {vehicle.plateNumber}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>{vehicle.category}</TableCell>
                    <TableCell>{vehicle.instructor}</TableCell>
                    <TableCell>
                      <Chip 
                        label={getStatusText(vehicle.status)} 
                        size="small" 
                        color={getStatusColor(vehicle.status) as any}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <IconButton 
                        size="small" 
                        onClick={() => handleEdit(vehicle)}
                        title="Редактировать"
                      >
                        <Edit />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        <Dialog open={isEditDialogOpen} onClose={() => setIsEditDialogOpen(false)} maxWidth="md" fullWidth>
          <DialogTitle>Редактировать ТС</DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2 }}>
              <TextField
                fullWidth
                label="Модель"
                value={formData.model}
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                sx={{ mb: 2 }}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsEditDialogOpen(false)} startIcon={<Cancel />}>
              Отмена
            </Button>
            <Button onClick={handleSave} variant="contained" startIcon={<Save />}>
              Сохранить
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
};

export default FleetManagement; 