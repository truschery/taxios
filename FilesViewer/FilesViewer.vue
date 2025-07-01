<script setup>
import { useVModels } from '@vueuse/core'
import { ref, watch } from 'vue'
import ImportFileView from "main_repository/components/ImportFileView"
import InformalFileInput from "@/views/edm/document/components/InformalFileInput.vue";
import VuePdfEmbed from "vue-pdf-embed";
import InformalFilesViewer from "@/views/edm/document/components/InformalFilesViewer.vue";
import {useI18n} from "vue-i18n";
import FilesViewerTabs from "@/views/edm/document/components/FilesViewer/FilesViewerTabs.vue";

const props = defineProps({
  modelValue: {
    type: Array,
    required: true,
  },

  title: {
    type: String,
    required: false,
    default: 'DOWNLOADED_FILES',
  },

  readonly: {
    type: Boolean,
    required: false,
  },
  multiply: {
    type: Boolean,
    required: false,
  },

  loading: {
    type: Boolean,
    required: false,
  },
})

const emit = defineEmits(['update:modelValue'])

const { modelValue } = useVModels(props, emit)
const { t } = useI18n()

const currentFile = ref({

})

const onUpdateCurrentFile = fileName => {
  if(fileName){
    const file = modelValue.value.find(file => file.name === fileName)
    console.log(file)

    if(file && file.hasOwnProperty('path')){
      currentFile.value.path = file.path
    } else if(file instanceof File){
      currentFile.value.path = URL.createObjectURL(file)
    }
  }
}

const deleteFile = (fileName) => {
  if(fileName){
    const file = modelValue.value.find(file => file.name === fileName)

    if(file){
      modelValue.value = modelValue.value.filter(mFile => mFile.name !== file.name)
    }
  }
}

</script>

<template>
  <div class="position-relative">
    <FilesViewerTabs
      v-model="modelValue"
      :readonly="readonly"
      @update:current-file="onUpdateCurrentFile"
      @delete:file="deleteFile"
    />

    <VRow>
      <VCol
        v-if="!modelValue.length"
        class="pt-0"
        cols="12"
      >
        <VCard>
          <VCardText>
            <ImportFileView
              v-model:uploaded-files="modelValue"
              :multiple="props.multiply"
              :allowed-formats="['pdf']"
              :max-records="0"
            />
          </VCardText>
        </VCard>
      </VCol>
      <!--    <VCol-->
      <!--      v-show="fileTabs.length"-->
      <!--      cols="12"-->
      <!--    >-->
      <!--      <div class="d-flex flex-column">-->
      <!--        <div class="d-flex">-->
      <!--          <VTabs-->
      <!--            v-model="currentFile"-->
      <!--            direction="horizontal"-->
      <!--            class="gap-4 d-print-none"-->
      <!--            show-arrows-->
      <!--            grow-->
      <!--          >-->
      <!--            <template v-for="file in fileTabs">-->
      <!--              <VTab-->
      <!--                :value="file.index"-->
      <!--                class="informalFileTab"-->
      <!--              >-->
      <!--                <div class="d-flex justify-space-between w-100 gap-2 text-base">-->
      <!--                  <div-->
      <!--                    class="d-flex justify-start w-100"-->
      <!--                    style="min-width: 180px"-->
      <!--                  >-->
      <!--                    <InformalFileInput-->
      <!--                      v-model="editName"-->
      <!--                      :edit-id="editId"-->
      <!--                      :current-file="currentFile"-->
      <!--                      :file="file"-->
      <!--                      @editFileName="editFileName"-->
      <!--                    />-->
      <!--                    <VTooltip-->
      <!--                      activator="parent"-->
      <!--                      open-delay="200"-->
      <!--                    >-->
      <!--                      {{ file.name }}-->
      <!--                    </VTooltip>-->
      <!--                  </div>-->
      <!--                  <div-->
      <!--                    style="width: fit-content"-->
      <!--                    class="d-flex align-center gap-1"-->
      <!--                  >-->
      <!--                    <template v-if="isEdit">-->
      <!--                      <template v-if="editId !== file.index">-->
      <!--                        <VIcon @click="() => editFileName(file)">-->
      <!--                          tabler-pencil-->
      <!--                        </VIcon>-->
      <!--                      </template>-->
      <!--                      <template v-else>-->
      <!--                        <VIcon @click.stop="saveFileName">-->
      <!--                          tabler-check-->
      <!--                        </VIcon>-->
      <!--                        <VIcon @click.stop="() => editFileName(null)">-->
      <!--                          tabler-x-->
      <!--                        </VIcon>-->
      <!--                      </template>-->
      <!--                      <VIcon @click.stop="() => removeFile(file)">-->
      <!--                        tabler-trash-->
      <!--                      </VIcon>-->
      <!--                    </template>-->
      <!--                    <template v-else>-->
      <!--                      <VIcon @click.stop="() => downloadFile(file)">-->
      <!--                        tabler-download-->
      <!--                      </VIcon>-->
      <!--                    </template>-->
      <!--                  </div>-->
      <!--                </div>-->
      <!--              </VTab>-->
      <!--            </template>-->
      <!--          </VTabs>-->
      <!--          <IconBtn-->
      <!--            v-if="isEdit"-->
      <!--            @click="fileInputLabel.click()"-->
      <!--          >-->
      <!--            <VIcon>tabler-plus</VIcon>-->
      <!--          </IconBtn>-->
      <!--        </div>-->
      <!--        <template v-if="isEdit">-->
<!--                <VFileInput-->
<!--                  ref="fileInputLabel"-->
<!--                  accept="application/pdf"-->
<!--                  :disabled="disabled"-->
<!--                  :model-value="files"-->
<!--                  multiple-->
<!--                  class="position-absolute"-->
<!--                  style="z-index: -1; opacity: 0"-->
<!--                  @update:model-value="addFiles"-->
<!--                />-->
      <!--        </template>-->
      <!--      </div>-->
      <!--    </VCol>-->

      <VCol
        v-if="modelValue.length"
        cols="12"
      >
        <div class="w-100 informal__document-pdf__viewer-wrapper">
          <div
            style="max-width: 700px;"
            class="mx-auto"
          >
            <VuePdfEmbed
              ref="pdfViewer"
              class="informal__document-pdf__viewer"
              :source="currentFile.path"
            />
          </div>
          <!--        <iframe  width="100%" height="700" :src="fileTabs[currentFile].path"/> -->
        </div>
      </VCol>
    </VRow>
  </div>
</template>
