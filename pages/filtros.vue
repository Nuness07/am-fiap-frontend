<template>
  <div class="filtros-tabela">
    <h2>Filtrar Funcionários</h2>
    <a-table :data-source="data" :columns="columns">
      <div
        slot="filterDropdown"
        slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
        style="padding: 8px"
      >
        <a-input
          v-ant-ref="c => (searchInput = c)"
          :placeholder="`Search ${column.dataIndex}`"
          :value="selectedKeys[0]"
          style="width: 188px; margin-bottom: 8px; display: block;"
          @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
          @pressEnter="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
        />
        <a-button
          type="primary"
          icon="search"
          size="small"
          style="width: 90px; margin-right: 8px"
          @click="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
        >
          Search
        </a-button>
        <a-button size="small" style="width: 90px" @click="() => handleReset(clearFilters)">
          Reset
        </a-button>
      </div>
      <a-icon
        slot="filterIcon"
        slot-scope="filtered"
        type="search"
        :style="{ color: filtered ? '#108ee9' : undefined }"
      />
      <template slot="customRender" slot-scope="text, record, index, column">
        <span v-if="searchText && searchedColumn === column.dataIndex">
          <template
            v-for="(fragment, i) in text
              .toString()
              .split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))"
          >
            <mark
              v-if="fragment.toLowerCase() === searchText.toLowerCase()"
              :key="i"
              class="highlight"
            >{{ fragment }}</mark>
            <template v-else>{{ fragment }}</template>
          </template>
        </span>
        <template v-else>
          {{ text }}
        </template>
      </template>
    </a-table>
  </div>
</template>

<script>
import UserService from '@/service/user/user-service'
const data = [
  {
    key: 1,
    id_usuario: 'c3ab00ab-9538-4a35-ac72-b3c4ea26e768',
    name: 'Thais Larissa Campos Neves',
    age: '21',
    cargo: 'Desenvolvedora Mobile',
    data_admissao: '12/10/2002',
    salario_atual: '15000',
    salario_anterior: '8200',
    filial: 'Cuiabá'
  },
  {
    key: 2,
    id_usuario: 'c3ab00ab-9538-4a35-ac72-b3c4ea26e769',
    name: 'Gabriel Nunes Monteiro Ferreira',
    age: '21',
    cargo: 'Desenvolvedor Front-End',
    data_admissao: '12/10/2000',
    salario_atual: '5000',
    salario_anterior: '2000',
    filial: 'São Paulo'
  },
  {
    key: 3,
    id_usuario: 'c3ab00ab-9538-4a35-ac72-b3c4ea26e765',
    name: 'Gerder Silva',
    age: '22',
    cargo: 'Desenvolvedor Back-End',
    data_admissao: '25/08/2015',
    salario_atual: '15000',
    salario_anterior: '12000',
    filial: 'São Paulo'
  },
  {
    key: 4,
    id_usuario: 'c3ab00ab-9538-4a35-ac72-b3c4ea26e761',
    name: 'Adriana Monteiro',
    age: '21',
    cargo: 'QA',
    data_admissao: '25/08/2010',
    salario_atual: '2000',
    salario_anterior: '1000',
    filial: 'São Paulo'
  },
  {
    key: 5,
    id_usuario: 'c3ab00ab-9538-4a35-ac72-b3c4ea26e742',
    name: 'Bruno Palotta',
    age: '21',
    cargo: 'DBA',
    data_admissao: '25/08/2015',
    salario_atual: '15000',
    salario_anterior: '5000',
    filial: 'Campinas'
  },
  {
    key: 6,
    id_usuario: 'c3ab00ab-9538-4a35-ac72-b3c4ea26e585',
    name: 'Lucas Moretto Merlo',
    cargo: 'Desenvolvedor Back-End',
    data_admissao: '25/04/2012',
    age: '28',
    salario_atual: '6000',
    salario_anterior: '2000',
    filial: 'Rio de Janeiro'
  },
  {
    key: 7,
    id_usuario: 'c3ab00ab-9538-4a35-ac72-b3c4ea26e478',
    name: 'Pedro Alves',
    age: '28',
    cargo: 'Desenvolvedor Back-End',
    data_admissao: '10/06/2011',
    salario_atual: '15000',
    salario_anterior: '12000',
    filial: 'São Paulo'
  },
  {
    key: 8,
    id_usuario: 'c3ab00ab-9538-4a35-ac72-b3c4ea26e361',
    name: 'Rafael da silva',
    age: '29',
    cargo: 'Desenvolvedor Mobile',
    data_admissao: '10/06/2003',
    salario_atual: '15000',
    salario_anterior: '12000',
    filial: 'São Paulo'
  },
  {
    key: 9,
    id_usuario: 'c3ab00ab-9538-4a35-ac72-b3c4ea26e712',
    name: 'Sara Aparecida',
    age: '44',
    cargo: 'Gerente de projetos',
    data_admissao: '10/06/1992',
    salario_atual: '20000',
    salario_anterior: '12000',
    filial: 'Brasilia'
  },
  {
    key: 10,
    id_usuario: 'c3ab00ab-9538-4a35-ac72-b3c4ea26e123',
    name: 'Gustavo Poschetino',
    age: '21',
    cargo: 'Desenvolvedor Full-Stack',
    data_admissao: '10/06/2011',
    salario_atual: '15000',
    salario_anterior: '12000',
    filial: 'São Paulo'
  },
  {
    key: 11,
    id_usuario: 'c3ab00ab-9538-4a35-ac72-b3c4ea26e325',
    name: 'Rubens Mota',
    age: '21',
    cargo: 'Desenvolvedor Mobile',
    data_admissao: '10/06/2009',
    salario_atual: '8000',
    salario_anterior: '2000',
    filial: 'São Paulo'
  },
  {
    key: 13,
    id_usuario: 'c3ab00ab-9523-4a35-ac72-b3c4ea26e478',
    name: 'Samanta Andrade',
    age: '24',
    cargo: 'Desenvolvedora Back-End',
    data_admissao: '10/06/2011',
    salario_atual: '15000',
    salario_anterior: '12000',
    filial: 'São Paulo'
  },
  {
    key: '8',
    name: 'Anderson Ricardo',
    age: 35,
    salario_atual: '18000',
    salario_anterior: '17000',
    data_admissao: '06/10/1995',
    cargo: 'Gerente de Projetos',
    filial: 'Porto Alegre'
  }
]
export default {
  layout: 'logged',
  middleware: 'auth',
  data () {
    return {
      funcionarios: {},
      data,
      searchText: '',
      searchInput: null,
      searchedColumn: '',
      columns: [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender'
          },
          onFilter: (value, record) =>
            record.name
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus()
              }, 0)
            }
          }
        },
        {
          title: 'Idade',
          dataIndex: 'age',
          key: 'age',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender'
          },
          onFilter: (value, record) =>
            record.age
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus()
              })
            }
          }
        },
        {
          title: 'Salario Atual',
          dataIndex: 'salario_atual',
          key: 'salario_atual',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender'
          },
          onFilter: (value, record) =>
            record.salario_atual
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus()
              })
            }
          }
        },
        {
          title: 'Salario Anterior',
          dataIndex: 'salario_anterior',
          key: 'salario_anterior',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender'
          },
          onFilter: (value, record) =>
            record.salario_anterior
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus()
              })
            }
          }
        },
        {
          title: 'Data de admissão',
          dataIndex: 'data_admissao',
          key: 'data_admissao',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender'
          },
          onFilter: (value, record) =>
            record.data_admissao
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus()
              })
            }
          }
        },
        {
          title: 'Cargo',
          dataIndex: 'cargo',
          key: 'cargo',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender'
          },
          onFilter: (value, record) =>
            record.cargo
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus()
              })
            }
          }
        },
        {
          title: 'Filial',
          dataIndex: 'filial',
          key: 'filial',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender'
          },
          onFilter: (value, record) =>
            record.cargo
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus()
              })
            }
          }
        }
      ]
    }
  },
  mounted () {
    this.getUsers()
  },
  methods: {
    handleSearch (selectedKeys, confirm, dataIndex) {
      confirm()
      this.searchText = selectedKeys[0]
      this.searchedColumn = dataIndex
    },

    async getUsers () {
      const users = await UserService.getUsers()
      this.funcionarios = users.data
    },

    handleReset (clearFilters) {
      clearFilters()
      this.searchText = ''
    }
  }
}
</script>
<style scoped>
.highlight {
  background-color: rgb(255, 192, 105);
  padding: 0px;
}

.filtros-tabela{
  padding: 36px;
}
</style>
