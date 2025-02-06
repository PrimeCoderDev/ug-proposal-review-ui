import { Component, OnInit } from '@angular/core';
import { TableComponent } from '@/app/components/table/table.component';
import { ColumnDef } from '@tanstack/angular-table';
import { DialogSwal } from '@/app/shared/Swal';
import { ModalComponent } from '@/app/components/modal/modal.component';
import { CommonModule } from '@angular/common';
import { PeriodService } from '@/app/services/period.service';
import { ComissionService } from '@/app/services/comission.service';
import { FormsModule } from '@angular/forms';

type TCommissionTable = {
  id: string;
  period: string;
  description: string;
  status: string;
};

type TCommissionMemberTable = {
  id: string;
  id_person: string;
  name: string;
  faculty: string;
  status: string;
  role_comission: string;
};

type TTeacherTable = {
  id: string;
  document: string;
  name: string;
  faculty: string;
  status: string;
};

@Component({
  selector: 'app-commission-reviewers',
  standalone: true,
  imports: [TableComponent, ModalComponent, CommonModule, FormsModule],
  templateUrl: './commission-reviewers.component.html',
  styleUrl: './commission-reviewers.component.css',
})
export class CommissionReviewersComponent implements OnInit {
  data: TCommissionTable[] = [];
  dataMembers: TCommissionMemberTable[] = [];
  dataTeachers: TTeacherTable[] = [];
  periods: any[] = [];
  selectedPeriod: string = '';
  description: string = '';
  isSaveEnabled: boolean = false;
  columns: ColumnDef<TCommissionTable>[] = [
    {
      accessorKey: 'period',
      header: 'Periodo',
      cell: (info) => info.getValue(),
      filterFn: 'includesString',
    },
    {
      accessorKey: 'description',
      header: 'Descripción',
      cell: (info) => info.getValue(),
      filterFn: 'includesString',
    },
    {
      accessorKey: 'status',
      header: 'Estado',
      cell: (info) => info.getValue(),
      filterFn: 'includesString',
    },
    {
      id: 'actions',
      header: 'Acciones',
      cell: (info) => info.row.original,
      enableColumnFilter: false,
    },
  ];
  columnsMembers: ColumnDef<TCommissionMemberTable>[] = [
    {
      accessorKey: 'name',
      header: 'Nombre',
      cell: (info) => info.getValue(),
      filterFn: 'includesString',
    },
    {
      accessorKey: 'faculty',
      header: 'Facultad',
      cell: (info) => info.getValue(),
      filterFn: 'includesString',
    },
    {
      accessorKey: 'role_comission',
      header: 'Rol',
      cell: (info) => info.getValue(),
      filterFn: 'includesString',
    },
    {
      accessorKey: 'status',
      header: 'Estado',
      cell: (info) => info.getValue(),
      filterFn: 'includesString',
    },
    {
      id: 'actions',
      header: 'Acciones',
      cell: (info) => info.row.original,
      enableColumnFilter: false,
    },
  ];
  columnsTeachers: ColumnDef<TTeacherTable>[] = [
    {
      accessorKey: 'document',
      header: 'Documento',
      cell: (info) => info.getValue(),
    },
    { accessorKey: 'name', header: 'Nombre', cell: (info) => info.getValue() },
    {
      accessorKey: 'faculty',
      header: 'Facultad',
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'status',
      header: 'Estado',
      cell: (info) => info.getValue(),
    },
    { id: 'actions', header: 'Acciones', cell: (info) => info.row.original },
  ];

  actionsConfig = {
    detail: false,
    edit: true,
    delete: true,
  };

  actionsConfigMembers = {
    detail: false,
    edit: false,
    delete: true,
  };

  actionsConfigTeachers = {
    detail: true,
    edit: false,
    delete: false,
  };

  dialogSwal = DialogSwal();
  isModalDetailOpen = false;
  isModalAddOpen = false;
  isModalEditOpen = false;
  isModalMembersOpen = false;
  isModalAddMemberOpen = false;
  selectedCommissionId: string = '';
  selectedStatus: string = '';
  selectedRole: string = '';

  constructor(
    private periodService: PeriodService,
    private comissionService: ComissionService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  toggleAddModal(): void {
    this.isModalAddOpen = !this.isModalAddOpen;
    if (this.isModalAddOpen) {
      this.loadPeriods();
    } else {
      this.resetForm();
    }
  }

  loadPeriods(): void {
    this.periodService.findAll().subscribe(
      (response) => {
        if (response.status === 'success') {
          this.periods = response.data;
        }
      },
      (error) => {
        console.error('Error al cargar los períodos:', error);
      }
    );
  }

  loadData(): void {
    this.comissionService.findAllHeader().subscribe(
      (response) => {
        if (response.status === 'success') {
          this.data = response.data.map((item: any) => ({
            id: item.id,
            period: item.period,
            description: item.description,
            status: item.status,
          }));
        }
      },
      (error) => {
        console.error('Error al cargar los datos:', error);
      }
    );
  }

  resetForm(): void {
    this.selectedPeriod = '';
    this.description = '';
    this.isSaveEnabled = false;
  }

  onPeriodChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedPeriod = value;
    this.isSaveEnabled = !!value;
  }

  onDescriptionChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.description = value.trim();
    this.isSaveEnabled = !!this.selectedPeriod && this.description.length > 0;
  }

  onSave(): void {
    if (!this.selectedPeriod || !this.description.trim()) {
      this.dialogSwal.Alert({
        title: 'Campos requeridos',
        text: 'Por favor, complete todos los campos obligatorios.',
        icon: 'warning',
      });
      return;
    }

    const data = {
      idPeriod: this.selectedPeriod,
      description: this.description,
    };

    this.comissionService.createHeader(data).subscribe(
      (response) => {
        if (response.status === 'success') {
          this.dialogSwal.Alert({
            title: 'Éxito',
            text: 'Comisión creada correctamente.',
            icon: 'success',
          });
          this.toggleAddModal();
          this.loadData();
        } else {
          this.dialogSwal.Alert({
            title: 'Error',
            text: 'No se pudo crear la comisión.',
            icon: 'error',
          });
        }
      },
      (error) => {
        console.error('Error al guardar la comisión:', error);
        this.dialogSwal.Alert({
          title: 'Error',
          text: 'Ocurrió un error al crear la comisión.',
          icon: 'error',
        });
      }
    );
  }

  toggleDetailModal() {
    this.isModalDetailOpen = !this.isModalDetailOpen;
  }

  toggleEditModal() {
    this.isModalEditOpen = !this.isModalEditOpen;
  }

  toggleMembersModal(): void {
    this.isModalMembersOpen = !this.isModalMembersOpen;
    if (this.isModalMembersOpen && this.selectedCommissionId) {
      this.comissionService.findOneDetail(this.selectedCommissionId).subscribe(
        (response) => {
          if (response.status === 'success') {
            this.dataMembers = response.data;
          } else {
            console.error('Error al obtener miembros:', response.message);
          }
        },
        (error) => console.error('Error al obtener miembros:', error)
      );
    }
  }

  toggleAddMemberModal(): void {
    this.isModalAddMemberOpen = !this.isModalAddMemberOpen;
    this.selectedRole = '';

    if (this.isModalAddMemberOpen) {
      this.comissionService.getTeachers().subscribe(
        (response) => {
          if (response.status === 'success') {
            this.dataTeachers = response.data.map((teacher: any) => ({
              id: teacher.id,
              document: teacher.document,
              name: teacher.name,
              faculty: teacher.faculty,
              status: teacher.status,
            }));
          } else {
            console.error('Error al obtener profesores:', response.message);
          }
        },
        (error) => {
          console.error('Error al obtener profesores:', error);
        }
      );
    }
  }

  onDetail(row: TCommissionTable) {
    console.log('Detalle:', row);
    this.toggleDetailModal();
  }

  onEdit(row: TCommissionTable): void {
    this.selectedPeriod = row.period;
    this.description = row.description;
    this.isSaveEnabled = true;
    this.isModalEditOpen = true;
    this.loadPeriods();
    this.selectedCommissionId = row.id;
  }

  onSaveEdit(): void {
    if (!this.selectedPeriod || !this.description.trim()) {
      this.dialogSwal.Alert({
        title: 'Campos requeridos',
        text: 'Por favor, complete todos los campos obligatorios.',
        icon: 'warning',
      });
      return;
    }

    const data = {
      idPeriod: this.selectedPeriod,
      description: this.description,
      status: this.selectedStatus,
    };

    this.comissionService
      .updateHeader(this.selectedCommissionId, data)
      .subscribe(
        (response) => {
          if (response.status === 'success') {
            this.dialogSwal.Alert({
              title: 'Éxito',
              text: 'Comisión actualizada correctamente.',
              icon: 'success',
            });
            this.isModalEditOpen = false;
            this.loadData();
          } else {
            this.dialogSwal.Alert({
              title: 'Error',
              text: 'No se pudo actualizar la comisión.',
              icon: 'error',
            });
          }
        },
        (error) => {
          console.error('Error al actualizar la comisión:', error);
          this.dialogSwal.Alert({
            title: 'Error',
            text: 'Ocurrió un error al actualizar la comisión.',
            icon: 'error',
          });
        }
      );
  }

  onEditMember(member: TCommissionMemberTable): void {
    console.log('Editar miembro:', member);
  }

  onDelete(row: TCommissionTable) {
    console.log('Eliminar:', row);
    this.dialogSwal
      .Confirm({
        title: 'Eliminar comision',
        text: '¿Está seguro de que desea eliminar esta comision?',
        icon: 'warning',
      })
      .then((result) => {
        if (result.isConfirmed) {
          console.log('Comisión eliminada:', row.id);
        }
      });
  }

  onDeleteMember(member: TCommissionMemberTable): void {
    this.dialogSwal
      .Confirm({
        title: 'Inactivar miembro',
        text: `¿Está seguro de que desea inactivar a ${member.name}?`,
        icon: 'warning',
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.comissionService.inactiveDetail(member.id).subscribe(
            (response) => {
              if (response.status === 'success') {
                this.dialogSwal.Alert({
                  title: 'Éxito',
                  text: 'Miembro inactivado correctamente.',
                  icon: 'success',
                });
                this.loadMembers();
              } else {
                this.dialogSwal.Alert({
                  title: 'Error',
                  text: 'No se pudo inactivar al miembro.',
                  icon: 'error',
                });
              }
            },
            (error) => {
              console.error('Error al inactivar miembro:', error);
              this.dialogSwal.Alert({
                title: 'Error',
                text:
                  error?.error?.message ||
                  'Ocurrió un error al inactivar al miembro.',
                icon: 'error',
              });
            }
          );
        }
      });
  }

  onAddTeacher(teacher: TTeacherTable): void {
    if (!this.selectedRole) {
      this.dialogSwal.Alert({
        title: 'Rol requerido',
        text: 'Por favor, seleccione un rol antes de agregar un profesor.',
        icon: 'warning',
      });
      return;
    }

    const data = {
      idComission: this.selectedCommissionId,
      idPerson: teacher.id,
      roleComission: this.selectedRole,
    };

    this.comissionService.createDetail(data).subscribe(
      (response) => {
        if (response.status === 'success') {
          this.dialogSwal.Alert({
            title: 'Éxito',
            text: 'Profesor agregado correctamente a la comisión.',
            icon: 'success',
          });
          this.toggleAddMemberModal();
          this.loadMembers();
        } else {
          this.dialogSwal.Alert({
            title: 'Error',
            text: 'No se pudo agregar el profesor a la comisión.',
            icon: 'error',
          });
        }
      },
      (error) => {
        console.error('Error al agregar profesor:', error.error);
        this.dialogSwal.Alert({
          title: 'Error',
          text:
            error?.error?.message || 'Ocurrió un error al agregar el profesor.',
          icon: 'error',
        });
      }
    );
  }

  loadMembers(): void {
    if (this.selectedCommissionId) {
      this.comissionService.findOneDetail(this.selectedCommissionId).subscribe(
        (response) => {
          if (response.status === 'success') {
            this.dataMembers = response.data;
          } else {
            console.error('Error al cargar los miembros:', response.message);
          }
        },
        (error) => console.error('Error al cargar los miembros:', error)
      );
    }
  }
}
