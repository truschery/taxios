<script setup>
import {useVModels, watchOnce} from "@vueuse/core";
import { onMounted, computed, ref, watch } from 'vue'
import VTooltipCustom from 'main_repository/components/customVuetifyComponents/VTooltipCustom';

const props = defineProps({
  modelValue: {
    type: Array,
    required: true,
  },
  readonly: {
    type: Boolean,
    required: false,
  },
})

const emit = defineEmits(['update:modelValue', 'update:current-file', 'delete:file'])

const { modelValue } = useVModels(props, emit)

const FILES_VIEWER_ADD = 'file-viewer-add'
const fileInput = ref()

const files = computed(() => {
  const _files = modelValue.value.map(file => ({ name: file.name, value: file.name }))

  return _files
})

const tabs = computed(() => {
  const _tabs = [
    ...files.value
  ]

  if(!props.readonly){
    _tabs.push({
      value: FILES_VIEWER_ADD,
    })
  }

  console.log(_tabs)

  return _tabs

})

const currentTab = ref()

const isCurrentTab = value => {
  return currentTab.value === value
}

const addFiles = value => {
  value = value.filter(file => file.name.endsWith('pdf'))

  modelValue.value.push(...value)
}

const onClickTab = (value) => {
  if(value === FILES_VIEWER_ADD){

    fileInput.value.click()

    return
  }

  currentTab.value = value

  const selectedTab = tabs.value.find(tab => tab.value === value)
  emit('update:current-file', selectedTab.value)
}

const removeFile = (value) => {
  const selectedTab = tabs.value.find(tab => tab.value === value)

  emit('delete:file', selectedTab.value)
}

watchOnce(() => files.value, (value) => {
  if(value?.length && !currentTab.value){
    onClickTab(value[0].name)
  }
})

watch(() => files.value, (value, oldValue) => {
  if(oldValue?.length === 0 && value.length === 1){
    onClickTab(value[0].name)
  }
})

onMounted(() => {
  if(files.value?.length && !currentTab.value){
    onClickTab(files.value[0].name)
  }
})
</script>

<template>
  <div
    v-show="files.length"
    class="files-viewer-tabs position-absolute"
  >
    <div class="d-flex gap-1">
      <template
        v-for="(file, index) in tabs"
        :key="`file-viewer-tab-${index}`"
      >
        <VCard
          class="files-viewer-tab px-4 py-2"
          :color="isCurrentTab(file.value) ? 'primary' : 'default'"
          @click="onClickTab(file.value)"
        >

          <template
            v-if="file.value === 'file-viewer-add' && !readonly"
          >
            <VIcon>tabler-plus</VIcon>
          </template>
          <template v-else>
            <div class="d-flex align-items-center">
              <div class="max-150 mr-4 clip">
                <span>{{ file.name }}</span>

                <VTooltipCustom>
                  {{ file.name }}
                </VTooltipCustom>
              </div>
              <div
                v-if="!readonly"
                class="position-relative z-2"
              >
                <VIcon @click.stop="() => removeFile(file.value)">
                  tabler-trash
                </VIcon>

              </div>
            </div>
          </template>

        </VCard>

      </template>
      <VFileInput
        ref="fileInput"
        accept="application/pdf"
        :disabled="disabled"
        :model-value="modelValue"
        multiple
        class="position-absolute"
        style="z-index: -1; opacity: 0"
        @update:model-value="addFiles"
      />
    </div>

  </div>
</template>

<style scoped lang="scss">

.files-viewer-tabs{
  z-index: 1;
  top: -27px;
  left: 0;
}


.files-viewer-tab {
  border-radius: 10px 10px 0 0 !important;

  .z-2{
    z-index: 2 !important;
  }

  .max-150{
    max-width: 150px;
  }
}

</style>
