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
    key: '1',
    name: 'Gabriel Nunes',
    age: 21,
    salario_atual: '2500',
    salario_anterior: '1000',
    data_admissao: '25/10/2005',
    cargo: 'Desenvolvedor Front-End',
    filial: 'São Paulo'
  },
  {
    key: '2',
    name: 'Thais Larissa Campos Neves',
    age: 22,
    salario_atual: '3400',
    salario_anterior: '5000',
    data_admissao: '22/07/2008',
    cargo: 'Desenvolvedor Mobile',
    filial: 'Cuiabá'
  },
  {
    key: '3',
    name: 'Gerder silva',
    age: 28,
    salario_atual: '10000',
    salario_anterior: '8000',
    data_admissao: '25/10/2000',
    cargo: 'Desenvolvedor Back-end',
    filial: 'São Paulo'
  },
  {
    key: '4',
    name: 'Bruno Palotta',
    age: 21,
    salario_atual: '1000',
    salario_anterior: '1000',
    data_admissao: '25/05/2021',
    cargo: 'Desenvolvedor Front-End',
    filial: 'São Paulo'
  },
  {
    key: '5',
    name: 'Adriana Monteiro',
    age: 21,
    salario_atual: '1200',
    salario_anterior: '600',
    data_admissao: '10/08/2021',
    cargo: 'QA',
    filial: 'Campinas'
  },
  {
    key: '6',
    name: 'Lucas Moretto',
    age: 48,
    salario_atual: '6000',
    salario_anterior: '3000',
    data_admissao: '25/10/2000',
    cargo: 'Desenvolvedor Front-End',
    filial: 'São Paulo'
  },
  {
    key: '7',
    name: 'Cleber Pensador',
    age: 18,
    salario_atual: '1500',
    salario_anterior: '800',
    data_admissao: '25/10/2020',
    cargo: 'DBA',
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
